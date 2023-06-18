import { useState, useEffect } from "react";

export default function Home() {
	const [file, setFile] = useState<File | null>(null);
	const [videoName, setVideoName] = useState("");
	const [loading, setLoading] = useState(false);
	const [answer, setAnswer] = useState("");

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!file) {
			return;
		}

		setAnswer("");

		const formData = new FormData();
		if (file) {
			formData.append("file", file);
		}
		formData.append("name", videoName);
		setLoading(true); // Set loading state to true
		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
			if (!res.ok) {
				throw data;
			}

			console.log(data);
			setAnswer(data.message);
		} catch (error) {
			console.log(error.error);
			setAnswer(error.error);
		} finally {
			setLoading(false); // Set loading state back to false
		}
	};

	const [videos, setVideos] = useState([]);

	const getVideos = async () => {
		const res = await fetch("/api/videos");
		const data = await res.json();
		setVideos(data.videos);
	};

	useEffect(() => {
		getVideos();
	}, []);

	return (
		<div className="container">
			<form onSubmit={onSubmit}>
				<label>
					Select File:
					<input
						type="file"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
					/>
				</label>
				<label>
					Video Name:
					<input
						type="text"
						value={videoName}
						onChange={(e) => setVideoName(e.target.value)}
						placeholder="Video Name"
					/>
				</label>
				<button type="submit" disabled={loading}>
					Upload
				</button>
				{loading && <p>Uploading...</p>}
				{answer && <p>{answer}</p>}
			</form>

			<div>
				<h1>All videos</h1>
				{videos.map((video) => (
					<div key={video.id}>
						<a href={`/videos/${video.id}`}>{video.filename}</a>
					</div>
				))}

				{!videos.length && <p>No videos uploaded yet.</p>}

				<button onClick={getVideos}>Refresh</button>
			</div>

			<style jsx>{`
				.container {
					max-width: 600px;
					margin: 0 auto;
					padding: 20px;
				}

				form {
					margin-bottom: 20px;
				}

				label {
					display: block;
					margin-bottom: 10px;
				}

				input[type="file"],
				input[type="text"],
				button {
					margin-top: 5px;
				}

				button {
					padding: 8px 16px;
					background-color: #007bff;
					color: #fff;
					border: none;
					cursor: pointer;
				}

				p {
					margin-top: 10px;
				}

				h1 {
					margin-bottom: 10px;
				}

				a {
					display: block;
					margin-bottom: 5px;
					color: #007bff;
					text-decoration: none;
				}

				button {
					padding: 8px 16px;
					background-color: #007bff;
					color: #fff;
					border: none;
					cursor: pointer;
				}
			`}</style>
		</div>
	);
}
