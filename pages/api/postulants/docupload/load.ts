import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

import AWS from '../../../../aws-config';
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const session = await getSession({ req });

	// Update AWS configuration with the provided credentials


	// Create a new instance of S3
	const s3 = new AWS.S3();
	const fileName = req.body.name;
	const fileType = req.body.type;
    const uniqueFileName = `${uuidv4()}.${fileName.split('.').pop()}`;
    const folder = process.env.FOLDER_DOCS_NAME;
    const ky = `${folder}${uniqueFileName}`;
	const s3Params = {
		Bucket:  process.env.BUCKET_NAME,
		Key: ky,
		ContentType: fileType,
		// ACL: "public-read",
	};
 
	try {
		// Get a signed URL from S3 for uploading an object
		s3.getSignedUrl("putObject", s3Params, async (err, data) => {
			if (err) {
				return res.json({ success: false, error: err });
			}
			const returnData = {
				signedRequest: data,
				url: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${ky}`,
				name:uniqueFileName,
                tupo:req.body.type
			};


			return res.status(200).json(returnData);
		});
	} catch (err) {
		return res.status(500).json(err);
	}
}
