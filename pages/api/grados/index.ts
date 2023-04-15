import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { IGrado } from '@/interfaces'

type Data = 
| { message: string }
| IGrado[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch( req.method ) {
        case 'GET':
            return getGrados( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getGrados = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const prisma = new PrismaClient()
    const grados = await prisma.grado.findMany();
    
    await prisma.$disconnect()

    return res.status(200).json( grados );

}
