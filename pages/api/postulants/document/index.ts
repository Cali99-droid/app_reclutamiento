import { IJob, IPostulant } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );



type Data = 
| { message: string }
| IJob[]
| IJob
| any;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
       
          case 'GET':
            return getDoc( req, res );
          case 'POST':
            return postDoc(req, res)
          default:
              return res.status(400).json({ message: 'Bad request' });
      }
    
 
}

async function  getDoc(req: NextApiRequest, res: NextApiResponse<any>) {
  const session: any = await getSession({ req });

  if ( !session ) {
      return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
  }

  const doc =  await prisma.postulante.findFirst({
    where:{
        persona_id:session.user.persona.id
    },
    select:{
        doc:true
    }
  })


  

    return res.status(200).json(doc)
}



async function  postDoc(req: NextApiRequest, res: NextApiResponse<any>) {
  const{doc='', id}=req.body
  const p = await prisma.postulante.findUnique({
    where: {
       id: parseInt(id.toString()) 
    },
    
   
    })
    console.log(p)
    if(p === null){
        return;
    }
    if(p.doc ){
        if ( p.doc !== doc) {
        // Borrar de cloudinary
        const [ fileId, extension ] = p.doc.substring( p.doc.lastIndexOf('/') + 1 ).split('.')
        console.log(fileId)
            await cloudinary.uploader.destroy( fileId );
        }
    }
 

  try {
     const document = await prisma.postulante.update({
        where: {
            id
          },data:{ 
            doc,
          }
     })  
    return res.status(200).json(document)
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({message:'algo salio mal'})
    
  }
 

}

