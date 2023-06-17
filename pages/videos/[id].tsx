import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import prismadb from "../../libs/prismadb";

export default function VideoPage() {
	const router = useRouter();
	const { id } = router.query;
	const [videoData, setVideoData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchVideoData = async () => {
			try {
				const response = await fetch("/api/video", {
					method: "POST",
					body: JSON.stringify({ id }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				const { video } = await response.json();
				if (video === null) {
					throw new Error("Video not found");
				}
				setVideoData(video);
			} catch (error) {
				setError(error.message);
			}
		};

		if (id) {
			fetchVideoData();
		}
	}, [id]);

	if (error) {
		return <p>{error}</p>;
	}

	if (!videoData) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h1>{videoData.filename}</h1>
			<VideoPlayer src={videoData.m3u8Url} />
		</div>
	);
}
