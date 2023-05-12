import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

// import { db } from '../../../database';
// import { User } from '../../../models';
import { PrismaClient, user } from '@prisma/client'


import { jwt, validations } from '../../../helpers';
import { generarId } from '@/helpers/functions';
import sendConfirmationEmail from '@/helpers/sendConfirmationEmail';
import { prisma } from '../../../server/db/client';


type Data = 
| { message: string }
| {
   
    user: any
}
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const{email}:any = req.query ;
   
 const user = await prisma.user.findFirst({
    where:{
        email
    },
    select:{
        confirmado:true
    }

 })

    return res.status(200).json({user})

    


}
