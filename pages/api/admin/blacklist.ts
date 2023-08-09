import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { convocatoria, postulante, user, item } from '@prisma/client';
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
        // case 'GET':
        //     return getPostulantes( req, res );
            
        // case 'PUT':
        //     return updatePostulante( req, res );

        case 'POST':
            return addBlacklist( req, res );

        // case 'DELETE':
        //     return deleteConvocatoria( req, res );
            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}




async function addBlacklist(req: NextApiRequest, res: NextApiResponse<any>) {
    const { id , status,idPos } = req.body;


  try {
    const pos = await prisma.postulante.findUnique({
        where:{
            id:idPos
        }
    })

    if(!pos){
        res.status(404).json({message:'hubo un error'});
    }
    const dni = pos?.numeroDocumento === null ? '':pos!.numeroDocumento;
    const  p = await prisma.blacklist.create({
        data:{
            fecha:new Date(),
            dni,
            postulante_id:idPos,
            create_time:new Date(),
        }
      
    })
    const  ppo = await prisma.postulante_x_convocatoria.update({
        where: {
          id
        },
        data: {
          
            estado_postulante_id:  parseInt(status),
            fecha_cambio:new Date(),
            update_time:new Date(),
          
        }
      })

    
    await prisma.$disconnect()
    res.status(201).json({p});
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return res.status(400).json({ message: 'Revisar logs del servidor' });
 }
}

