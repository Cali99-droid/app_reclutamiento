import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
import fs from 'fs';
import client from '@/aws3-config';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand } from '@aws-sdk/client-s3';


type Data = {
    message: string
}

export const config = {
    api: {
        bodyParser: false,
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


const saveFile = async( file: formidable.File ): Promise<string> => {

     const data = fs.readFileSync( file.filepath );
    // fs.writeFileSync(`./public/${ file.originalFilename }`, data);
    // fs.unlinkSync( file.filepath ); // elimina
    // return;
    // const { secure_url } = await cloudinary.uploader.upload( file.filepath );
	const uniqueFileName = `${uuidv4()}.${file.originalFilename!.split('.').pop()}`;

	const folder = process.env.FOLDER_DOCS_NAME;;
	const fileName = `${folder}${uniqueFileName}`;
	const params = {
        Bucket: process.env.BUCKET_NAME!,
        Key: fileName, // Utiliza el nombre único
        Body: data, // El contenido del archivo
       
      };
	const uploadResponse = await client.send(new PutObjectCommand(params));
	console.log("Objeto subido exitosamente a S3:", uploadResponse);
    return uniqueFileName;

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
    
    return res.status(200).json({ message: imageUrl });

}
