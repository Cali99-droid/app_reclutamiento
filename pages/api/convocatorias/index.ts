import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';




type Data = 
| { message: string }
| IJob[]
| IJob
| any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getConvocatorias( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const getConvocatorias = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const convocatorias =await prisma.convocatoria.findMany({
        where:{
            estadoId:1
        },
        select: {
            id:true,
            titulo:true,
            descripcion:true,
            img:true,
            vacantes:true,
            experiencia:true,
            estado:{
              select: {  nombre: true},  
            },
            grado:{
              select: {  nombre: true},  
            }
        }, orderBy: {
            id: "desc"
          }
    });
    await prisma.$disconnect()
     return  res.status(200).json( convocatorias );
 
 }
 