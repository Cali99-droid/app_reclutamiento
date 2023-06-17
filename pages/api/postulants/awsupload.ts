import type { NextApiRequest, NextApiResponse } from 'next'



import AWS from '../../../aws-config';

import  S3  from 'aws-sdk/clients/s3';


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
    const s3 = new S3({
      
        region:"us-west-2",
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        signatureVersion:'v4',
    });
    
    try {

        let {name,type} = req.body;
        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key:name,
            Expires:600,
            ContentType:type,
            
            ACL:"public-read",
        };
        
        const url = await s3.getSignedUrlPromise('putObject', fileParams)
        console.log(url)
        return res.status(200).json({ message: url});
     } catch (error) {
        console.log(error)
     }
    


}

