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
    const hoy = new Date().toISOString().split('T')[0]

    const convocatorias =await prisma.convocatoria.findMany({
        where:{
            vigencia:{gte:new Date(hoy)}
        },
        select: {
            id:true,
            titulo:true,
            descripcion:true,
            img:true,
            vacantes:true,
            experiencia:true,
            vigencia:true,
            slug:true,
            estado:{
              select: {  nombre: true},  
            },
            grado:{
              select: {  nombre: true},  
            },
            _count: {
              select: { postulante_x_convocatoria: true }
            }
        }, orderBy: {
            id: "desc"
          }
    });
   
    await prisma.$disconnect()
     return  res.status(200).json( convocatorias );
 
 }
 