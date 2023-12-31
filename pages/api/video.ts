import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../libs/prismadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// find one video by id
		console.log(req.body.id);
		const video = await prismadb.video.findUnique({
			where: {
				id: req.body.id,
			},
		});
		res.status(200).json({ video });
	} catch (error) {
		console.error("Error retrieving videos:", error);
		res.status(500).json({
			error: "An error occurred while retrieving videos.",
		});
	}
};
