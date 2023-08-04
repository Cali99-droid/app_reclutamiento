
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import {  test } from '@prisma/client';



type Data = 
|{message: string}
|test;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // const {id} = req.query;
    // if(!moongose.isValidObjectId(id)){
    //     return res.status(400).json({message:'el id no es valido' + id})
    // }

    switch (req.method) {
        case 'DELETE':
             return deleteTest(req, res);


        default:
            return res.status(400).json({message:'no existe el la tic'})
            break;
    }
  
}



const deleteTest= async(req:NextApiRequest, res:NextApiResponse<Data>)=>{
    const{id}:any = req.query ;

const items = await prisma.item.findFirst({
    where:{
        test_id:parseInt(id)
    }
})

if(items){
  return  res.status(400).json({message:'No se puede eliminar, elimine los items primero'})
}
    try {
        const test = await prisma.test.delete({
            where:{
                id:parseInt(id)
            }
        })
        
         res.status(200).json({message:'Eliminado Correctamente'})
    } catch (error) {
        console.log(error)
        await prisma.$disconnect();
        res.status(400).json({message:'bad request'})
    }
}