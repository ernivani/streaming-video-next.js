import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src }) {
	const videoRef = useRef(null);
	const hlsRef = useRef(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		video.controls = true;

		if (video.canPlayType("application/vnd.apple.mpegurl")) {
			// This will run in Safari, where HLS is supported natively
			video.src = src;
		} else if (Hls.isSupported()) {
			// This will run in all other modern browsers
			const hls = new Hls();
			hlsRef.current = hls;

			hls.loadSource(src);
			hls.attachMedia(video);
		} else {
			console.error(
				"This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
			);
		}
	}, [src, videoRef]);

	useEffect(() => {
		const hls = hlsRef.current;
		if (hls) {
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				const availableQualities = hls.levels.map((level) => ({
					name: level.name,
					width: level.width,
					height: level.height,
				}));
				console.log("Available Qualities:", availableQualities);

				// Example: Set the initial quality to the lowest available quality
				const lowestQualityIndex = 0;
				hls.currentLevel = lowestQualityIndex;
			});
		}
	}, []);

	return (
		<div className="video-container">
			<video ref={videoRef} className="video" />
			<style jsx>{`
				.video-container {
					width: 100%;
					max-width: 500px; /* Set the maximum width as desired */
				}

				.video {
					width: 100%;
					height: auto;
				}
			`}</style>
		</div>
	);
}
