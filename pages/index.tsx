import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

export default function Home() {
	const [videoUrl, setVideoUrl] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/video")
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				setVideoUrl(url);
			});
	}, []);

	if (!videoUrl) {
		return <div>Loading...</div>;
	}

	return <VideoPlayer src={videoUrl} />;
}
