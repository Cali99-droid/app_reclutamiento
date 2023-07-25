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
        case 'POST':
            return postContrato( req, res );

            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}


const postContrato = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { idPos , monto } = req.body;
    try {
      const  convocatoria = await prisma.postulante_x_convocatoria.update({
        where: {
          id:idPos
        },
        data: {
          
            monto:  parseInt(monto),
            estado_postulante_id:7
          
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

