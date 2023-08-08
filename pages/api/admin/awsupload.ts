import type { NextApiRequest, NextApiResponse } from 'next'

import { v4 as uuidv4 } from 'uuid';

import AWS from '../../../aws-config';




type Data = |
    {message: string }|
    {url: string }

export const config = {
    api: {
  
        sizeLimit: "8mb"
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
    // const session: any = await getSession({ req });
    // console.log(session)
    // if ( !session ) {
    //     return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    // }
    let {name,type} = req.body;
       // Genera un nombre único para el archivo
       const uniqueFileName = `${uuidv4()}.${name.split('.').pop()}`;
       const folder = process.env.FOLDER_IMG_NAME;
       const fileName = `${folder}${uniqueFileName}`;
    const s3 = new AWS.S3();
  
    try {

        
        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key:fileName,
            Expires:600,
            ContentType:type,
            ACL:"public-read",
        };
        
        const url = await s3.getSignedUrlPromise('putObject', fileParams)
       
        return res.status(200).json({ url: url,message:uniqueFileName});
     } catch (error) {
        console.log(error)
     }
    


}

