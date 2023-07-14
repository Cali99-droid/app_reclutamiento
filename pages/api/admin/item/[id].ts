
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { cargo, test } from '@prisma/client';

import aws from 'aws-sdk';
import AWS from '../../../../aws-config';

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
             return deleteItem(req, res);


        default:
            return res.status(400).json({message:'no existe el la tic'})
            break;
    }
  
}



const deleteItem= async(req:NextApiRequest, res:NextApiResponse<Data>)=>{
    const{id}:any = req.query ;

// if(items){
//   return  res.status(400).json({message:'No se puede eliminar, elimine los items primero'})
// }
    try {
        const test = await prisma.item.delete({
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