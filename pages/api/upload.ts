import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../libs/prismadb";
import { exec } from "child_process";
import ffmpegPath from "ffmpeg-static";
import multer, { MulterError } from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const folderName = uuidv4(); // Generate a unique folder name
		const destination = path.join("public/videos/", folderName); // Specify the destination folder path
		fs.mkdirSync(destination, { recursive: true }); // Create the destination folder
		cb(null, destination);
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("video/")) {
			cb(null, true);
		} else {
			cb(new Error("Only video files are allowed."));
		}
	},
}).single("file");

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		upload(req, res, function (err: MulterError) {
			if (err) {
				console.error("Multer error:", err);
				return res.status(500).json({ error: err.message });
			}

			const file = req.file;
			if (!file) {
				return res.status(400).json({ error: "No file provided" });
			}

			const uniqueId = uuidv4();
			const actualFileName = `${uniqueId}_${file.originalname}`;
			const outputName = req.body.name
				? req.body.name
				: file.originalname;
			const folderName = path.basename(path.dirname(file.path)); // Get the folder name

			exec(
				// ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -vf scale=3840x2160 -b:v 30M -maxrate 30M -bufsize 60M -g 48 -keyint_min 48 -sc_threshold 0 -map 0 -hls_time 6 -hls_playlist_type vod -hls_segment_filename "output/%03d.ts" output.m3u8
				// `${ffmpegPath} -i "public/videos/${folderName}/${file.originalname}" -c:v libx264 -crf 23 -preset medium -vf scale=3840x2160 -b:v 20M -g 48 -keyint_min 48 -sc_threshold 0 -map 0 -hls_time 6 -hls_playlist_type vod -hls_segment_filename "public/videos/${folderName}/%03d.ts" "public/videos/${folderName}/${actualFileName}.m3u8"`,
				`${ffmpegPath} -i "public/videos/${folderName}/${file.originalname}" -c:v libx264 -preset veryfast -crf 23 -vf scale=3840x2160 -b:v 30M -maxrate 30M -bufsize 60M -g 48 -keyint_min 48 -sc_threshold 0 -map 0 -hls_time 6 -hls_playlist_type vod -hls_segment_filename "public/videos/${folderName}/%03d.ts" -threads 4 -movflags +faststart "public/videos/${folderName}/${actualFileName}.m3u8"`,
				async (error, stdout, stderr) => {
					if (error) {
						console.error("FFmpeg exec error:", error);
						return res.status(500).json({
							error: "An error occurred while processing the video.",
						});
					}
					if (stderr) {
						// console.warn("FFmpeg stderr:", stderr);
					}
					try {
						await prismadb.video.create({
							data: {
								filename: outputName,
								m3u8Url: `/videos/${folderName}/${actualFileName}.m3u8`,
							},
						});
						fs.unlink(
							`public/videos/${folderName}/${file.originalname}`,
							(err) => {
								if (err) {
									console.error(
										"Failed to delete original file:",
										err
									);
								}
							}
						);
						res.status(200).json({
							message: "Video saved successfully",
						});
					} catch (error) {
						console.error(
							"Error inserting data into database:",
							error
						);
						return res.status(500).json({
							error: "An error occurred while saving the video.",
						});
					}
				}
			);
		});
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
};
