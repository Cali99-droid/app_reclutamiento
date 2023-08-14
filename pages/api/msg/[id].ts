import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/server/db/client';

import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import NextAuth  from '@/pages/api/auth/[...nextauth]'
import { item, mensajes } from '@prisma/client';
type Data = 
| { message: string }
| mensajes;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch( req.method ) {
        case 'GET':
            return getMsg( req, res )
            case 'PUT':
                return readMsg( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getMsg = async(req: NextApiRequest, res: NextApiResponse<Data>) => { 
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
      const pos = await prisma.postulante.findFirst({
        where:{
            persona_id:user.persona_id
        }
      })

      if(!pos){
        return  res.status(403).json({message:'hubo un error'});
      }
try{
   
    const { id=''  } = req.query;
    const msg = await prisma.mensajes.findMany({
        where: {
            postulante_id:pos.id
        }, orderBy: {
            id: 'desc'
        }
    })
        await prisma.$disconnect()
        const mes = JSON.parse(JSON.stringify(msg))
        res.status(201).json(mes);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}
const readMsg = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    try{
    
        const { id=''  } = req.query;
        const msg = await prisma.mensajes.update({
            data:{
                status:1

            },
            where: {
                id: parseInt(id.toString())
            }
        })
            await prisma.$disconnect()
            const mes = JSON.parse(JSON.stringify(msg))
            res.status(201).json(mes);
        } catch (error) {
            console.log(error);
            await prisma.$disconnect()
            return res.status(400).json({ message: 'Revisar logs del servidor' });
         }
    
    }

