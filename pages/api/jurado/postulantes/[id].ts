import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { convocatoria, postulante, user } from '@prisma/client';
import { getSession } from 'next-auth/react';




type Data = 
| { message: string }
| IJob[]
| IJob
| postulante;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getEvaluacionPostulante( req, res );
       

        // case 'POST':
        //     return createConvocatoria( req, res );

        // case 'DELETE':
        //     return deleteConvocatoria( req, res );
            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const getEvaluacionPostulante = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id=''  } = req.query;
    const session: any = await getSession({ req });
    if ( !session ) {
        return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    }
    const idUser = session.user.id
  
    // const convocatoria = await prisma.convocatoria.findUnique({
    //     where: {
    //       id: parseInt(id.toString())
    //     }
    //   })
      const listaPostulantes = await prisma.postulante_x_convocatoria.findMany({
        where: {
          convocatoria_id: parseInt(id.toString()),
          AND:{
            estado_postulante_id: 3
          }
         
        },
        
        
        include: {
          postulante: {
         
            include: {
            
              persona: {
                
                include:{
                  user:true
                }
              },
            
              evaluacion_x_postulante:{
                where:{
                  convocatoria_id:parseInt(id.toString()),
                  AND:{
                  user_id:parseInt(idUser.toString())
                  }
                 

                },
                select:{puntaje:true,user_id:true},
                orderBy:{
                  puntaje:'asc'
                }
              },
              estudios:true,
              cargo:true,
              investigacion:true,
              capacitacion:true,
              aficion:true,
              reconocimiento:true,
              tics:true
              
            }
            
          }

        },
      });
      const postulantes = JSON.parse(JSON.stringify(listaPostulantes))

      await prisma.$disconnect()
      res.status(201).json( postulantes );
 
 }
