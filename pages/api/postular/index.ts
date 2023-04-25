import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { convocatoria } from '@prisma/client';




type Data = 
| { message: string }
| IJob[]
| IJob
| any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return createPostulancion( req, res );
        // case 'PUT':
        //   return updatePostulante( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}
async function createPostulancion(req: NextApiRequest, res: NextApiResponse<Data>) {

    const{id, idPostulante} = req.body;

    const convocatorias = await prisma.postulante_x_convocatoria.findMany({
        where:{
            convocatoria_id:id,
            postulante_id:idPostulante
        }

    })

    if(convocatorias.length >0){
        return res.status(400).json({
            message: 'No puede postular dos veces'
        });
    }
    const convocatoriaPostulante = await prisma.postulante_x_convocatoria.create({
        data:{
            convocatoria_id: id,
            postulante_id:idPostulante,
            estado_postulante_id:1
        }
    })
    await prisma.$disconnect()
    return res.status(200).json(convocatoriaPostulante);
}

