import { IJob, IPostulant } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import aws from 'aws-sdk';

import { S3 } from 'aws-sdk';



type Data = 
| { message: string }
| IJob[]
| IJob
| any;

let idPost:any
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
       
          case 'GET':
            return getProfesion( req, res );
          case 'POST':
            return postEstudios(req, res);
          case 'PUT':
            return updateEstudios(req, res)
          default:
              return res.status(400).json({ message: 'Bad request' });
      }
    
 
}

async function  getProfesion(req: NextApiRequest, res: NextApiResponse<any>) {
  const session: any = await getSession({ req });

  if ( !session ) {
      return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
  }

  idPost =  await prisma.postulante.findFirst({
    where:{
        persona_id:session.user.persona.id
    },
    select:{
        id:true
    }
  })


   const estudios = await prisma.estudios.findMany({
    where: {
       postulante_id:idPost.id
    } 
   
    })

    return res.status(200).json(estudios)
}



async function  postEstudios(req: NextApiRequest, res: NextApiResponse<any>) {
  const{profesion='', institucion='',grado='',year=0,idPos,doc=''}=req.body


  try {
     const estudio = await prisma.estudios.create({
        data:{
          profesion,
          institucion,
          grado,
          year:parseInt(year),
          postulante_id:idPos,
          doc
        }
      })  
    return res.status(200).json(estudio)
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({message:'algo salio mal'})
    
  }
 

}

async function updateEstudios(req: NextApiRequest, res: NextApiResponse<any>) {
  const{id, profesion='', institucion='',grado='',year=0,idPos,doc=''}=req.body


  const estudio = await  prisma.estudios.findUnique({
    where:{
      id
    },
    select:{
      doc:true
    }
  })
  const s3 = new S3({     
    region:"us-west-2",
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    signatureVersion:'v4',
});

  if(estudio){
    if(estudio.doc !== doc){
      const deleteParams: aws.S3.DeleteObjectRequest = {
        Bucket: process.env.BUCKET_NAME!,
        Key: 'docs/'+ estudio.doc,
      };
      const resp = await s3.deleteObject(deleteParams).promise();
      console.log('se elimino el documento', resp)
    }
  }

  try {
     const estudio = await prisma.estudios.update({
      where:{
        id
      },
        data:{
          profesion,
          institucion,
          grado,
          year:parseInt(year),
          postulante_id:idPos,
          doc
        }
      })  

    return res.status(200).json(estudio)
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({message:'algo salio mal'})
    
  }
}

