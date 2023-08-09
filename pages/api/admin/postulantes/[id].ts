import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { convocatoria, postulante, user, item, persona } from '@prisma/client';
import { getSession } from 'next-auth/react';
import moment from 'moment-timezone';
import { getServerSession } from 'next-auth';
import NextAuth  from '@/pages/api/auth/[...nextauth]'
import { userAgent } from 'next/server';


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
    const session:any = await getServerSession(req, res, NextAuth);

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
                  comentario:true,
                  maximo:true,
                  test:{
                    select:{
                      categoria_id:true
                    }
                  },
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
  

  const session:any = await getServerSession(req, res, NextAuth);
  if(!session){
    return  res.status(403).json({message:'No autorizado'});
  }
   const email = session.user.email;
   const user = await prisma.user.findFirst({
      where:{
          email
      }
   })
   if(!user){
      return  res.status(403).json({message:'No autorizado'});
    }
  const { id , status } = req.body;

  try {
    const  p = await prisma.postulante_x_convocatoria.update({
      where: {
        id
      },
      data: {
        
          estado_postulante_id:  parseInt(status),
          fecha_cambio:new Date(),
          update_time:new Date(),
        
      }
    })

    const post = await prisma.postulante.findFirst({
      where:{
        id:p.postulante_id
      },select:{
        persona:true
      }
    })

    const user = await prisma.user.updateMany({
      data:{
        rol_id:1
      },where:{
        persona_id:post?.persona.id
      }
    })

    



//TODO agregar a historial
// await prisma.historial.create({
//   data:{
//       accion:`Cambio de estado a Apto a entrevista`,
//       postulante_id:p.postulante_id
//   }
// })
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

