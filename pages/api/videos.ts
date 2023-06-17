import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../libs/prismadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const videos = await prismadb.video.findMany();
		res.status(200).json({ videos });
	} catch (error) {
		console.error("Error retrieving videos:", error);
		res.status(500).json({
			error: "An error occurred while retrieving videos.",
		});
	}
};
