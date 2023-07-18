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
    // if ( !session ) {
    //     return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    // }
    let {name,type,fil} = req.body;
       // Genera un nombre único para el archivo
       const uniqueFileName = `${uuidv4()}.${name.split('.').pop()}`;
       const folder = 'img/';
       const fileName = `${folder}${uniqueFileName}`;
    const s3 = new AWS.S3();

    try {

        
        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key:fileName,
            Expires:600,
            ContentType:type,
          
        };
        
        const url = await s3.getSignedUrlPromise('putObject', fileParams)
        console.log(url)
        return res.status(200).json({ url: url,message:uniqueFileName});
     } catch (error) {
        console.log(error)
     }
    


}

const convertToWebP = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const canvas = document.createElement('canvas');

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(image, 0, 0, image.width, image.height);
          canvas.toBlob((blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result as string);
              };
              reader.readAsDataURL(blob);
            } else {
              reject(new Error('No se pudo crear el Blob de la imagen.'));
            }
          }, 'image/webp', 0.9);
        } else {
          reject(new Error('No se pudo obtener el contexto del canvas.'));
        }
      };

      image.onerror = () => {
        reject(new Error('No se pudo cargar la imagen.'));
      };

      image.src = URL.createObjectURL(file);
    });
  };

