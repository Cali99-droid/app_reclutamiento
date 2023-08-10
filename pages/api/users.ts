import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';




type Data = 
| { message: string }

| any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getUsers( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const getUsers = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
   

    const users =await prisma.user.findMany({
        where:{
          
            OR:[
                {
                rol_id:6,  
                },
                {
                    rol_id:5,  
                    }
        ]
        },
        select:{
            persona:{
                select:{
                    nombres:true,
                    apellido_mat:true,
                    apellido_pat:true,
                    postulante:{
                        select:{
                            image:true
                        }
                    }
                }
            },
        }
    })
    
    await prisma.$disconnect()
     return  res.status(200).json( users );
 
 }
 