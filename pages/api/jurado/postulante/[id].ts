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
            return getPostulante( req, res );
            
      

        // case 'POST':
        //     return createConvocatoria( req, res );

        // case 'DELETE':
        //     return deleteConvocatoria( req, res );
            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const getPostulante = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id=''  } = req.query;
    // const convocatoria = await prisma.convocatoria.findUnique({
    //     where: {
    //       id: parseInt(id.toString())
    //     }
    //   })
      const p = await prisma.postulante.findFirst({
        where: {
          id: parseInt(id.toString())
        },
        
        include: {
         cargo:true,
         aficion:true,
         capacitacion:true,
         estudios:true,
         investigacion:true,
         reconocimiento:true,
         tics:true
        },
      });
      const postulante = JSON.parse(JSON.stringify(p))

      await prisma.$disconnect()
      res.status(201).json( postulante );
 
 }

