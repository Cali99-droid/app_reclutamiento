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
        case 'GET':
            return getUsers( req, res );
        case 'POST':
            return createItem( req, res );
            case 'PUT':
                return updateItem( req, res );
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const getUsers = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const users = await prisma.user.findMany({
        include: {
            persona: true,
        },
    });
    // const users = JSON.parse(JSON.stringify(ListUsers))

    await prisma.$disconnect()
     return  res.status(200).json( users );
 
 }
 const createItem= async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { idTest , descripcion } = req.body;
    try {
      const item = await prisma.item.create({
        data:{
            descripcion,
            test_id:idTest
        }
      })

      
      await prisma.$disconnect()
      res.status(201).json({item});
  } catch (error) {
      console.log(error);
      await prisma.$disconnect()
      return res.status(400).json({ message: 'Revisar logs del servidor' });
   }
   
}

async function updateItem(req: NextApiRequest, res: NextApiResponse<any>) {
    const {descripcion, id} = req.body
    try {
        const  item = await prisma.item.update({
           data:{
            descripcion,
           },where:{
            id
           }
        })
        await prisma.$disconnect()
        res.status(201).json({item});
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
}
 