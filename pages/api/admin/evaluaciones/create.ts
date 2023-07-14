import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/server/db/client';
import {   test } from '@prisma/client';


type Data = 
| { message: string }
|{ev: test}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch( req.method ) {
        case 'POST':
            return createEvaluacion( req, res )
        case 'PUT':
            return editEvaluacion( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const createEvaluacion = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {evaluacion} = req.body
    try {
        const  ev = await prisma.test.create({
           data:{
            nombre:evaluacion
           }
        })



        await prisma.$disconnect()
        res.status(201).json({ev});
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
}
async function editEvaluacion(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {evaluacion,id} = req.body
    try {
        const  ev = await prisma.test.update({
           data:{
            nombre:evaluacion
           },where:{
            id
           }
        })



        await prisma.$disconnect()
        res.status(201).json({ev});
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
}

