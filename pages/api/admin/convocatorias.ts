import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { convocatoria } from '@prisma/client';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );
import aws from 'aws-sdk';
import AWS from '../../../aws-config';


type Data = 
| { message: string }
| IJob[]
| IJob
| any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getConvocatorias( req, res );
            
        case 'PUT':
            return updateConvocatoria( req, res );

        case 'POST':
            return createConvocatoria( req, res );

        case 'DELETE':
            return deleteConvocatoria( req, res );
            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const deleteConvocatoria = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const id = parseInt(req.body)

    const postulantes = await prisma.postulante_x_convocatoria.findMany({
      where:{
        convocatoria_id :id
      },
    })

     
    if ( postulantes.length > 0 ) {
      return res.status(400).json({
          message: 'No se puede eliminar, ya existen postulantes'
      });
  }
  const c = await prisma.convocatoria.findUnique({
    where: {
      id: parseInt(id.toString()) 
    }
    
  
    })
    if(c === null){
      return;
  }
  const s3 = new AWS.S3();
  if(c.img ){
    
    // Borrar de cloudinary
    // const [ fileId, extension ] = convo.img.substring( convo.img.lastIndexOf('/') + 1 ).split('.')
 
    // await cloudinary.uploader.destroy( fileId );
    const deleteParams: aws.S3.DeleteObjectRequest = {
      Bucket: process.env.BUCKET_NAME!,
      Key: process.env.FOLDER_IMG_NAME!+ c.img,
    };
    const resp = await s3.deleteObject(deleteParams).promise();
    console.log('se elimino la img', resp)

}

    const deleteJob = await prisma.convocatoria.delete({
        where:{
            id
        }
      })
      await prisma.$disconnect()
      res.status(201).json( deleteJob );
 
 }

const getConvocatorias = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const convocatorias = await prisma.convocatoria.findMany({
        include: {
          estado: {
            select: { id: true, nombre: true },
          },
          grado: {
            select: { nombre: true },
          },
          _count: {
            select: { postulante_x_convocatoria: true }
          }
        }, orderBy: {
          id: "desc"
        }
      });
    
    await prisma.$disconnect()
    return res.status(200).json( convocatorias );

}


const updateConvocatoria = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const convo = req.body as IJob;
    if ( convo.img.length <= 0 ) {
      return res.status(400).json({ message: 'Es Necesario que suba una imagen' });
    }

    const s3 = new AWS.S3();
  
        // Borrar de cloudinary
        // const [ fileId, extension ] = convo.img.substring( convo.img.lastIndexOf('/') + 1 ).split('.')
        // console.log({  fileId, extension });
        // await cloudinary.uploader.destroy( fileId );
 


      const c = await prisma.convocatoria.findUnique({
        where: {
          id: parseInt(convo.id.toString()) 
        }
        
      
        })
        if(c === null){
          return;
      }
      if(c.img ){
          if ( c.img !== convo.img) {
          // Borrar de cloudinary
          // const [ fileId, extension ] = convo.img.substring( convo.img.lastIndexOf('/') + 1 ).split('.')
       
          // await cloudinary.uploader.destroy( fileId );
          const deleteParams: aws.S3.DeleteObjectRequest = {
            Bucket: process.env.BUCKET_NAME!,
            Key: process.env.FOLDER_IMG_NAME!+ c.img,
          };
          const resp = await s3.deleteObject(deleteParams).promise();
          console.log('se elimino la img', resp)
      }
    }
    try {
      const  convocatoria = await prisma.convocatoria.update({
        where: {
          id: convo.id,
        },
        data: {
            titulo:           convo.titulo,
            descripcion:      convo.descripcion,
            experiencia:      parseInt(convo.experiencia.toString()),
            vacantes:         parseInt(convo.vacantes.toString()),
            sueldoOfertado:  parseFloat(convo.sueldoOfertado.toString()) ,
            estadoId:        1,
            gradoId:         parseInt(convo.gradoId.toString()),
            vigencia:  new Date(convo.vigencia),
            img:convo.img
        },
      })

      
      await prisma.$disconnect()
      res.status(201).json({convocatoria});
  } catch (error) {
      console.log(error);
      await prisma.$disconnect()
      return res.status(400).json({ message: 'Revisar logs del servidor' });
   }
   
}

const createConvocatoria = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const convo = req.body as IJob;

    if ( !convo.img ) {
      return res.status(400).json({ message: 'Es Necesario que suba una imagen' });
    }

    try {
        const  convocatoria = await prisma.convocatoria.create({
            data: {
                titulo:           convo.titulo,
                descripcion:      convo.descripcion,
                experiencia:      parseInt(convo.experiencia.toString()),
                vacantes:         parseInt(convo.vacantes.toString()),
                sueldoOfertado:   parseFloat(convo.sueldoOfertado.toString()) ,
                vigencia:         new Date(convo.vigencia),
                estadoId:         1,
                gradoId:           parseInt(convo.gradoId.toString()),
                categoria_id:           parseInt(convo.categoria_id.toString()),
                img:convo.img
            },
        })



        await prisma.$disconnect()
        res.status(201).json({convocatoria});
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}
