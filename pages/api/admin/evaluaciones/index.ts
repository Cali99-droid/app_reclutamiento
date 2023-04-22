import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/server/db/client';
import {  evaluacion_x_postulante } from '@prisma/client';

type Data = 
| { message: string }
|{ev: evaluacion_x_postulante}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch( req.method ) {
        case 'POST':
            return createEvaluacion( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const createEvaluacion = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

     const {id, puntaje, idPos} = req.body

    const existeEv = await prisma.evaluacion_x_postulante.findMany({
        where:{
            convocatoria_id:parseInt(id),
            AND:{
                postulante_id:idPos,
                evaluacion_id:1
            }
            
        },
    })

    if(existeEv.length>0){
        return res.status(400).json({
            message:'Ya tiene evaluación'
        })
    }

    try {
        const  ev = await prisma.evaluacion_x_postulante.create({
            data: {
               puntaje,
               puntaje_max:50,
               postulante_id:idPos,
               convocatoria_id:parseInt(id) ,
               evaluacion_id:1

            },
        })



        await prisma.$disconnect()
        res.status(201).json({ev});
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}
