import { IJob, IPostulant } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { S3 } from 'aws-sdk';
import aws from 'aws-sdk';
import { capacitacion } from '@prisma/client';



type Data = 
| { message: string }
| IJob[]
| IJob
| any;

let idPost:any
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
       
          case 'GET':
            return getCapacitacion( req, res );
          case 'POST':
            return postCapacitacion(req, res);
          case 'PUT':
            return updateCapacitacion(req, res)
          default:
              return res.status(400).json({ message: 'Bad request' });
      }
    
 
}

async function  getCapacitacion(req: NextApiRequest, res: NextApiResponse<any>) {
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


   const capacitacion = await prisma.capacitacion.findMany({
    where: {
       postulante_id:idPost.id
    } 
   
    })

    return res.status(200).json(capacitacion)
}



async function  postCapacitacion(req: NextApiRequest, res: NextApiResponse<any>) {
  const{titulo='', institucion='',horas,descripcion,year,idPos,doc}=req.body


  try {
     const cargo = await prisma.capacitacion.create({
        data:{
   
          titulo,
          institucion,
          horas:parseInt(horas),
          descripcion,
          year:parseInt(year),
          postulante_id:idPos,
          doc
        }
      })  
    return res.status(200).json(cargo)
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({message:'algo salio mal'})
    
  }
 

}

async function updateCapacitacion(req: NextApiRequest, res: NextApiResponse<any>) {
  const{id,titulo='', institucion='',horas,descripcion,year,idPos,doc}=req.body


  const capacitacion = await  prisma.capacitacion.findUnique({
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
if(capacitacion){
  if(capacitacion.doc !== doc){
    const deleteParams: aws.S3.DeleteObjectRequest = {
      Bucket: process.env.BUCKET_NAME!,
      Key: 'docs/'+ capacitacion.doc,
    };
    const resp = await s3.deleteObject(deleteParams).promise();
    console.log('se elimino el documento', resp)
  }
}


  try {
     const cargo = await prisma.capacitacion.update({
      where:{
        id
      },
        data:{
   
          titulo,
          institucion,
          horas:parseInt(horas),
          descripcion,
          year:parseInt(year),
          postulante_id:idPos,
          doc
        }
      })  
    return res.status(200).json(cargo)
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({message:'algo salio mal'})
    
  }
}

