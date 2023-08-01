import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';
import { postulante } from '@prisma/client';




type Data = 
| { message: string }
| IJob[]
| IJob
| any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getUsers( req, res );
        case 'PUT':
            return updateUser( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const getUsers = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const session :any = await getSession(res);
    let users;
    // if(session){
    //        console.log(session.user?.rol_id)
    // }
if(session.user?.rol_id === 2){
 users = await prisma.user.findMany({
        include: {
            persona: true,
        },
    });
// users = await prisma.postulante_x_convocatoria.findMany({
//     include:{
//         postulante:{
//             select:{
//                 persona:{
//                     select:{
//                         nombres:true,
//                         apellido_mat:true,
//                         apellido_pat:true,
//                         user:true
//                     }
//                 }
//             }
//         }
//     }
// })
}else{
    // users = await prisma.postulante_x_convocatoria.findMany({
    //     include:{
    //         postulante:{
    //             select:{
    //                 persona:{
    //                     select:{
    //                         nombres:true,
    //                         apellido_mat:true,
    //                         apellido_pat:true,
    //                         user:true
    //                     }
    //                 }
    //             }
    //         }
    //     },where:{
    //         estado_postulante_id:7
    //     }
    // })

     users = await prisma.user.findMany({
        include: {
            persona: true,
            

        },
        where:{
            rol_id:{
                not:2
            }
        }
    }); 
}
    
    // const users = JSON.parse(JSON.stringify(ListUsers))

    await prisma.$disconnect()
     return  res.status(200).json( users );
 
 }
 const updateUser= async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id , status } = req.body;
    try {
      const  user = await prisma.user.update({
        where: {
          id
        },
        data: {
          
            rol_id:  parseInt(status),
          

        },
      })

      
      await prisma.$disconnect()
      res.status(201).json({user});
  } catch (error) {
      console.log(error);
      await prisma.$disconnect()
      return res.status(400).json({ message: 'Revisar logs del servidor' });
   }
   
}
 