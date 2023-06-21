
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { estudios } from '@prisma/client';

import aws from 'aws-sdk';
import AWS from '../../../../aws-config';
type Data = 
|{message: string}
|estudios;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // const {id} = req.query;
    // if(!moongose.isValidObjectId(id)){
    //     return res.status(400).json({message:'el id no es valido' + id})
    // }

    switch (req.method) {
        case 'DELETE':
             return deleteEstudio(req, res);
            break;
        case 'GET':
            // return getEntry(req, res);
            break;
        default:
            return res.status(400).json({message:'no existe el la tic'})
            break;
    }
  
}



const deleteEstudio= async(req:NextApiRequest, res:NextApiResponse<Data>)=>{
    const{id}:any = req.query ;
 
    const estudio = await  prisma.estudios.findUnique({
        where:{
            id:parseInt(id)
        },
        select:{
          doc:true
        }
      })
     
    if(estudio){
        const s3 = new AWS.S3();
    
    const deleteParams: aws.S3.DeleteObjectRequest = {
        Bucket: process.env.BUCKET_NAME!,
        Key: 'docs/'+ estudio.doc,
    };
    const resp = await s3.deleteObject(deleteParams).promise();
    console.log('se elimino el documento', resp)
    try {
        const delEstudio = await prisma.estudios.delete({
            where:{
                id:parseInt(id)
            }
        })
        
           res.status(200).json(delEstudio)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect();
        res.status(400).json({message:'bad request'})
    }
    }else{
        res.status(400).json({message:'bad request'}) 
    }

    

   



}