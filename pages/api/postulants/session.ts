import { IPostulant } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';
import AWS from '../../../aws-config';
import aws from 'aws-sdk';


type Data = 
| { message: string } 
| IPostulant

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;

    // if ( !mongoose.isValidObjectId( id ) ) {
    //     return res.status(400).json({ message: 'El id no es válido ' + id })
    // }
    
    switch ( req.method ) {
      

        case 'POST':
            return postSession( req, res );

            
        default:
            return res.status(400).json({ message: 'Método no existe ' + req.method });
    }

}

async function  postSession(req: NextApiRequest, res: NextApiResponse<any>) {
    // const session: any = await getSession({ req });
    // if ( !session ) {
    //     return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    // }
   const {doc,id} = req.body;
   const pc = await  prisma.postulante_x_convocatoria.findUnique({
    where:{
        id:parseInt(id)
    },
    select:{
      session:true
    }
  })
 
   if(pc){
    if(pc.session !== doc){
        const s3 = new AWS.S3();
        const deleteParams: aws.S3.DeleteObjectRequest = {
            Bucket: process.env.BUCKET_NAME!,
            Key: 'docs/'+ pc.session,
        };
        const resp = await s3.deleteObject(deleteParams).promise();
        console.log('se elimino el documento', resp)
    }

}

    const evpost = await prisma.postulante_x_convocatoria.update({
        where:{
            id:parseInt(id)
 
        },
        data:{
            session:doc
        }
    })

      return res.status(200).json(evpost)
  }

