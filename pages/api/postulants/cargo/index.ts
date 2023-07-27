import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';

import { S3 } from 'aws-sdk';
import aws from 'aws-sdk';



type Data = 
| { message: string }
| IJob[]
| IJob
| any;

let idPost:any
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
       
          case 'GET':
            return getCargos( req, res );
          case 'POST':
            return postCargo(req, res);
          case 'PUT':
            return updateCargo(req, res)
          default:
              return res.status(400).json({ message: 'Bad request' });
      }
    
 
}

async function  getCargos(req: NextApiRequest, res: NextApiResponse<any>) {
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


   const investigaciones = await prisma.cargo.findMany({
    where: {
       postulante_id:idPost.id
    } 
   
    })

    return res.status(200).json(investigaciones)
}



async function  postCargo(req: NextApiRequest, res: NextApiResponse<any>) {
  const{referencia='',  contacto='',institucion='',remuneracion,nivel='',cantidadCargo=0,descripcion,year,idPos,doc}=req.body



  try {
     const cargo = await prisma.cargo.create({
        data:{
    
          referencia,
          contacto,
          institucion,
          remuneracion:parseFloat(remuneracion),
          nivel,
          cantidad_cargo: isNaN(cantidadCargo) ? parseInt(cantidadCargo) : 0,
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

async function updateCargo(req: NextApiRequest, res: NextApiResponse<any>) {
  const{id,referencia='',  contacto='',institucion='',remuneracion,nivel='',cantidadCargo=0,descripcion,year,idPos,doc}=req.body

    const cargo = await  prisma.cargo.findUnique({
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
  if(cargo){
    if(cargo.doc !== doc){
      const deleteParams: aws.S3.DeleteObjectRequest = {
        Bucket: process.env.BUCKET_NAME!,
        Key: 'docs/'+ cargo.doc,
      };
      const resp = await s3.deleteObject(deleteParams).promise();
      console.log('se elimino el documento', resp)
    }
  }

  try {
     const cargo = await prisma.cargo.update({
      where:{
        id
      },
        data:{
    
          referencia,
          contacto,
          institucion,
          remuneracion:parseFloat(remuneracion),
          nivel,
          cantidad_cargo: isNaN(cantidadCargo) ? parseInt(cantidadCargo) : 0,
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

