import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/server/db/client';
import {  evaluacion_x_postulante } from '@prisma/client';
import { getSession } from 'next-auth/react';

type Data = 
| { message: string }
|{ev: evaluacion_x_postulante}
|{itemValues: any}


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

     
    
 

  const {itemValues, totalSum, idTest, idPos, idUser,id } = req.body
  console.log(itemValues)
    // const existeEv = await prisma.evaluacion_x_postulante.findMany({
    //     where:{
    //         convocatoria_id:parseInt(id),
    //         AND:{
    //             postulante_id:idPos,
    //             evaluacion_id:idEv
    //         }
            
    //     },
    // })

    // if(existeEv.length>0){
    //     return res.status(400).json({
    //         message:'Ya tiene evaluación'
    //     })
    // }

    try {
        // const  ev = await prisma.evaluacion_x_postulante.create({
        //     data: {
        //        puntaje,
        //        puntaje_max:max,
        //        postulante_id:idPos,
        //        convocatoria_id:parseInt(id) ,
        //        evaluacion_id:idEv,
        //        user_id:parseInt(idUser.toString()) 

        //     },
        // })

        const puntajes = await prisma.puntajes.create({
            data:{
                total:totalSum,
                test_id:idTest,
                postulante_id: idPos,
                user_id:parseInt(idUser),
                convocatoria_id:parseInt(id)
            }
        })
        await prisma.puntaje_items.createMany({
                data: Object.entries(itemValues).map(([itemId, value ]) => ({
                  item_id: parseInt(itemId),
                  puntaje_item:parseInt(value as string),
                  puntajes_id:puntajes.id
                })),
              });
    
        console.log('Valores guardados en la base de datos.');


        await prisma.$disconnect()
        res.status(201).json({itemValues});
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}
