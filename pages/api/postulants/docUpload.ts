import type { NextApiRequest, NextApiResponse } from 'next'
 import formidable from 'formidable';
 import fs from 'fs';

 import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { S3 } from 'aws-sdk';
cloudinary.config( process.env.CLOUDINARY_URL || '' );


type Data = {
    message: string
}|
{url: string }

export const config = {
    api: {
        sizeLimit: "2mb"
    }
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res);
   
        default:
            res.status(400).json({ message: 'Bad request' });
    }

}



const uploadFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.log(req.body)
    let {name,type} = req.body;
    
    // Genera un nombre único para el archivo
    const uniqueFileName = `${uuidv4()}.${name.split('.').pop()}`;
    const folder = 'docs/';
    const fileName = `${folder}${uniqueFileName}`;
    const s3 = new S3({     
        region:"us-west-2",
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        signatureVersion:'v4',
    });
 
 try {

     
     const fileParams = {
         Bucket: process.env.BUCKET_NAME,
         Key:fileName,
         Expires:600,
         ContentType:type,
         ACL:"public-read",
     };
     
     const url = await s3.getSignedUrlPromise('putObject', fileParams)
     console.log(url)
     return res.status(200).json({ url: url,message:uniqueFileName});
  } catch (error) {
     console.log(error)
  }
 

}
