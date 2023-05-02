import { ITics } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';

type Data = 
|{message: string}
|ITics;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // const {id} = req.query;
    // if(!moongose.isValidObjectId(id)){
    //     return res.status(400).json({message:'el id no es valido' + id})
    // }

    switch (req.method) {
        case 'DELETE':
             return deleteTic(req, res);
            break;
        case 'GET':
            // return getEntry(req, res);
            break;
        default:
            return res.status(400).json({message:'no existe el la tic'})
            break;
    }
  
}

const getEntry = async(req:NextApiRequest, res:NextApiResponse<Data>)=>{
   

    // res.status(200).json(entry)
}

const deleteTic= async(req:NextApiRequest, res:NextApiResponse<Data>)=>{
    const{id}:any = req.query ;
 


    try {
        const delTic = await prisma.tics.delete({
            where:{
                id:parseInt(id)
            }
        })
        
           res.status(200).json(delTic)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect();
        res.status(400).json({message:'bad request'})
    }

   



}