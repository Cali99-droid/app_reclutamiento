import type { NextApiRequest, NextApiResponse } from 'next'
 import formidable from 'formidable';
 import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';
import AWS from '../../../aws-config';
import { S3 } from 'aws-sdk';
import Content from '../../../components/dash/Content';

cloudinary.config( process.env.CLOUDINARY_URL || '' );


type Data = |
    {message: string }|
    {url: string }

export const config = {
    api: {
        bodyParser: false,
        sizeLimit: "8mb"
    }
}

const s3 = new S3({
    region:"us-west-2",
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
    signatureVersion:'v4'

})

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res);
   
        default:
            res.status(400).json({ message: 'Bad request' });
    }

}


const saveFile = async( file: formidable.File ): Promise<string> => {

    // const data = fs.readFileSync( file.filepath );
    // fs.writeFileSync(`./public/${ file.originalFilename }`, data);
    // fs.unlinkSync( file.filepath ); // elimina
    // return;

    const { secure_url } = await cloudinary.uploader.upload( file.filepath );
    try {

        //  let {file} = req.body;
        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key:file.filepath,
            Expires:600,
            ContentType:"image/jpeg",
            ACL:"public-read",
        };
        console.log(fileParams)
        const url = await s3.getSignedUrlPromise('putObject', fileParams)
        console.log(url)
      
     } catch (error) {
        console.log(error)
     }
    return secure_url;

}


const parseFiles = async(req: NextApiRequest): Promise<string> => {

    return new Promise( (resolve, reject) => {

        const form = new formidable.IncomingForm();
        form.parse( req, async( err, fields, files ) => {
            // console.log({ err, fields, files });

            if ( err ) {
                return reject(err);
            }

            const filePath = await saveFile( files.file as formidable.File )
            resolve(filePath);
          
        })

    }) 

}


const uploadFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
       const imageUrl = await parseFiles(req);

    

    return res.status(200).json({ message: imageUrl});

}

