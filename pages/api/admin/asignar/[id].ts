import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { convocatoria, postulante, user } from '@prisma/client';
import { getSession } from 'next-auth/react';




type Data = 
| { message: string }
| IJob[]
| IJob
| postulante
| any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getJurados( req, res );
            
    

        // case 'POST':
        //     return createConvocatoria( req, res );

        case 'DELETE':
            return deleteJurado( req, res );
            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const getJurados = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id=''  } = req.query;
      const juradosSer = await prisma.convocatoria_x_jurado.findMany({
        where: {
          convocatoria_id: parseInt(id.toString())
         
        },
        
        include:{
            user:true
        }
        
      });
      const jurados = JSON.parse(JSON.stringify(juradosSer))

      await prisma.$disconnect()
      res.status(201).json( jurados );
 
 }
async function deleteJurado(req: NextApiRequest, res: NextApiResponse<Data>) {
    const idJurado = parseInt(req.body)
    const deleteJurado = await prisma.convocatoria_x_jurado.delete({
        where:{
            id:idJurado
        }
    })

    await prisma.$disconnect()
      res.status(201).json( deleteJurado );
}

