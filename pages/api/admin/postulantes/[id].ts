import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { convocatoria, postulante, user, item } from '@prisma/client';
import { getSession } from 'next-auth/react';
import moment from 'moment-timezone';



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

        case 'POST':
            return sendMessage( req, res );

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
          estado_postulante:true,
          postulante: {
            include: {
              puntajes:{
                where:{
                  convocatoria_id:parseInt(id.toString()),
                },select:{
                  total:true,
                  user:{
                    select:{
                      persona:{
                        select:{
                          nombres:true,
                          apellido_pat:true,
                          apellido_mat:true
                        }  
                      },
                      rol:true
                    }
                  },
                  _count:{
                    select:{
                      puntaje_items:true
                    }
                  }
                },orderBy:{
                  total:'desc'
                }
              },
              persona: {
                include:{
                  user:true
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

async function updatePostulante(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id , status } = req.body;

  try {
    const  p = await prisma.postulante_x_convocatoria.update({
      where: {
        id
      },
      data: {
        
          estado_postulante_id:  parseInt(status),
          fecha_cambio:new Date(),
      },
    })

//TODO agregar a historial
    
    await prisma.$disconnect()
    res.status(201).json({p});
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return res.status(400).json({ message: 'Revisar logs del servidor' });
 }
}


async function sendMessage(req: NextApiRequest, res: NextApiResponse<any>) {
  const { idPos , message } = req.body;
  let fecha =  moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');

  try {
    const  p = await prisma.postulante_x_convocatoria.update({
      where: {
        id:idPos
      },
      data: {       
          comentario:  message,
          fecha_comentario:  moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss')
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

