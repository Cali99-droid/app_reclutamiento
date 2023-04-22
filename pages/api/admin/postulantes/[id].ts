import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { convocatoria, postulante } from '@prisma/client';




type Data = 
| { message: string }
| IJob[]
| IJob
| postulante;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getPostulantes( req, res );
            
        case 'PUT':
            return updatePostulante( req, res );

        // case 'POST':
        //     return createConvocatoria( req, res );

        // case 'DELETE':
        //     return deleteConvocatoria( req, res );
            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const getPostulantes = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id=''  } = req.query;
    // const convocatoria = await prisma.convocatoria.findUnique({
    //     where: {
    //       id: parseInt(id.toString())
    //     }
    //   })
      const listaPostulantes = await prisma.postulante_x_convocatoria.findMany({
        where: {
          convocatoria_id: parseInt(id.toString())
        },
        include: {
          postulante: {
            include: {
              persona: true,
              estado_postulante:true,
              evaluacion_x_postulante:{
                where:{
                  convocatoria_id:parseInt(id.toString()),
                  AND:{
                    evaluacion_id:1
                  }

                },
                select:{puntaje:true},
                orderBy:{
                  puntaje:'asc'
                }
              }
              
            }
            
          }
        },
      });
      const postulantes = JSON.parse(JSON.stringify(listaPostulantes))

      await prisma.$disconnect()
      res.status(201).json( postulantes );
 
 }

async function updatePostulante(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id , status } = req.body;

  try {
    const  p = await prisma.postulante.update({
      where: {
        id
      },
      data: {
        
          estado_postulante_id:  parseInt(status),
        

      },
    })

    
    await prisma.$disconnect()
    res.status(201).json({p});
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return res.status(400).json({ message: 'Revisar logs del servidor' });
 }
}

