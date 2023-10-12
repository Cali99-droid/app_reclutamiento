import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

// import { db } from '../../../database';
// import { User } from '../../../models';
import { PrismaClient, user } from '@prisma/client'


import { jwt, validations } from '../../../helpers';
import { generarId } from '@/helpers/functions';
import sendConfirmationEmail from '@/helpers/sendConfirmationEmail';
import { prisma } from '../../../server/db/client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import client from '@/aws3-config';


type Data = 
| { message: any }
| {
   
    str: any
}
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return download(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const download = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const{filename}:any = req.query ;
    const dir = process.env.FOLDER_DOCS_NAME + filename
    console.log(dir)
    const command = new GetObjectCommand({
        Bucket: "caebucket",
        Key: dir
    });

    try {
        const response = await client.send(command);
       
        // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
        if (response.Body) {
            const buffer = await collectStream(response.Body);
            const str = buffer.toString('base64');
          
            return res.status(200).json({str})
        } else {
            const str = "nada";
            console.log('nada')
        }


    } catch (err) {
        console.error(err);
    }


    return res.status(200).json({message:'si'})

    


}


async function collectStream(stream:any) {
    const chunks = [];
    for await (const chunk of stream) {
      if (Buffer.isBuffer(chunk)) {
        chunks.push(chunk);
      } else {
        chunks.push(Buffer.from(chunk));
      }
    }
    return Buffer.concat(chunks);
  }