type VideoPlayerProps = {
	src: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
	return (
		<video controls src={src}>
			Your browser does not support the video tag.
		</video>
	);
};

export default VideoPlayer;
