import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { convocatoria } from '@prisma/client';




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
console.log(postulantes)
     
    if ( postulantes.length > 0 ) {
      return res.status(400).json({
          message: 'No se puede eliminar'
      });
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
        },
      });
    
    await prisma.$disconnect()
    return res.status(200).json( convocatorias );

}


const updateConvocatoria = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const convo = req.body as IJob;
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

    try {
        const  convocatoria = await prisma.convocatoria.create({
            data: {
                titulo:           convo.titulo,
                descripcion:      convo.descripcion,
                experiencia:      parseInt(convo.experiencia.toString()),
                vacantes:         parseInt(convo.vacantes.toString()),
                sueldoOfertado:  parseFloat(convo.sueldoOfertado.toString()) ,
                estadoId:        1,
                gradoId:         parseInt(convo.gradoId.toString()),

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
