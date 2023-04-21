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
        case 'PUT':
            return updateConvocatoria( req, res );

            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}


const updateConvocatoria = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id , status } = req.body;
    try {
      const  convocatoria = await prisma.convocatoria.update({
        where: {
          id
        },
        data: {
          
            estadoId:  parseInt(status),
          

        },
      })

      
      await prisma.$disconnect()
      res.status(201).json({convocatoria});
  } catch (error) {
      console.log(error);
      await prisma.$disconnect()
      return res.status(400).json({ message: 'Revisar logs del servidor' });
   }
   
}

