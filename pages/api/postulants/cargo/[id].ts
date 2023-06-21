
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { cargo } from '@prisma/client';

import aws from 'aws-sdk';
import AWS from '../../../../aws-config';

type Data = 
|{message: string}
|cargo;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // const {id} = req.query;
    // if(!moongose.isValidObjectId(id)){
    //     return res.status(400).json({message:'el id no es valido' + id})
    // }

    switch (req.method) {
        case 'DELETE':
             return deleteCargo(req, res);
            break;
        case 'GET':
            // return getEntry(req, res);
            break;
        default:
            return res.status(400).json({message:'no existe el la tic'})
            break;
    }
  
}



const deleteCargo= async(req:NextApiRequest, res:NextApiResponse<Data>)=>{
    const{id}:any = req.query ;
    const cargo = await  prisma.cargo.findUnique({
        where:{
            id:parseInt(id)
        },
        select:{
          doc:true
        }
      })
     
    if(cargo){
        const s3 = new AWS.S3();
    const deleteParams: aws.S3.DeleteObjectRequest = {
        Bucket: process.env.BUCKET_NAME!,
        Key: 'docs/'+ cargo.doc,
    };
    const resp = await s3.deleteObject(deleteParams).promise();
    console.log('se elimino el documento', resp)

    try {
        const delCargo = await prisma.cargo.delete({
            where:{
                id:parseInt(id)
            }
        })
        
           res.status(200).json(delCargo)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect();
        res.status(400).json({message:'bad request'})
    }
}else{
    res.status(400).json({message:'bad request'}) 
}


   



}