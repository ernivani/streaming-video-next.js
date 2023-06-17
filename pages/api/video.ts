import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const config = {
	api: {
		responseLimit: "8mb",
	},
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const filePath = path.resolve(".", "videos", "aaa.mp4");
		const stat = fs.statSync(filePath);
		const fileSize = stat.size;
		const range = req.headers.range;

		if (range) {
			const parts = range.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

			const chunksize = end - start + 1;
			const file = fs.createReadStream(filePath, { start, end });
			const head = {
				"Content-Range": `bytes ${start}-${end}/${fileSize}`,
				"Accept-Ranges": "bytes",
				"Content-Length": chunksize,
				"Content-Type": "video/mp4",
			};

			// artifical delay
			setTimeout(() => {
				res.writeHead(206, head);
				file.pipe(res);
			}, 10000);
		} else {
			const head = {
				"Content-Length": fileSize,
				"Content-Type": "video/mp4",
			};
			res.writeHead(200, head);
			fs.createReadStream(filePath).pipe(res);
		}
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}
