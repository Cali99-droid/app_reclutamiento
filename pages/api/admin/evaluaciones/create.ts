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
    const {evaluacion,rolId,categoriaId} = req.body
    try {
        const  ev = await prisma.test.create({
           data:{
            nombre:evaluacion,
            rol_id: rolId,
            categoria_id:categoriaId
           },
           include:{
            rol:true,
            categoria:true,
            _count: {
              select: {
                item: true,
              }
            }
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
    const {evaluacion,id,rolId,categoriaId} = req.body
    try {
        const  ev = await prisma.test.update({
            data:{
                nombre:evaluacion,
                rol_id: rolId,
                categoria_id:categoriaId
               },
               include:{
                rol:true,
                categoria:true,
                _count: {
                  select: {
                    item: true,
                  }
                }
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

