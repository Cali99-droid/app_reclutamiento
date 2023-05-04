import { IJob, IPostulant } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';




type Data = 
| { message: string }
| IJob[]
| IJob
| any;

let idPost:any
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
       
          case 'GET':
            return getCargos( req, res );
          case 'POST':
            return postCargo(req, res)
          default:
              return res.status(400).json({ message: 'Bad request' });
      }
    
 
}

async function  getCargos(req: NextApiRequest, res: NextApiResponse<any>) {
  const session: any = await getSession({ req });

  if ( !session ) {
      return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
  }

  idPost =  await prisma.postulante.findFirst({
    where:{
        persona_id:session.user.persona.id
    },
    select:{
        id:true
    }
  })


   const investigaciones = await prisma.cargo.findMany({
    where: {
       postulante_id:idPost.id
    } 
   
    })

    return res.status(200).json(investigaciones)
}



async function  postCargo(req: NextApiRequest, res: NextApiResponse<any>) {
  const{referencia='', institucion='',remuneracion,nivel='',cantidadCargo='',descripcion,year,idPos}=req.body


  try {
     const cargo = await prisma.cargo.create({
        data:{
   
          referencia,
          institucion,
          remuneracion:parseFloat(remuneracion),
          nivel,
          cantidadCargo:parseInt(cantidadCargo),
          descripcion,
          year:parseInt(year),
          postulante_id:idPos
        }
      })  
    return res.status(200).json(cargo)
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
    return res.status(500).json({message:'algo salio mal'})
    
  }
 

}

