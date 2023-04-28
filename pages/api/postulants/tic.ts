import { IJob, IPostulant } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';




type Data = 
| { message: string }
| IJob[]
| IJob
| any;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
       
          case 'GET':
            return getTic( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
    
 
}

async function  getTic(req: NextApiRequest, res: NextApiResponse<any>) {
  const session: any = await getSession({ req });
  if ( !session ) {
      return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
  }

  const idPost:any =  await prisma.postulante.findFirst({
    where:{
        persona_id:session.user.persona.id
    },
    select:{
        id:true
    }
  })


   const p = await prisma.tics.findMany({
    where: {
       postulante_id:idPost.id
    } 
   
    })


console.log(p)

    return res.status(200).json(p)
}

const createPostulant = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  

    const { 
    nombre ,
    apellidoPat, 
    apellidoMat,
    email,
      telefono,
      direccion,
      nacimiento,
      tipoId ,
      numeroDocumento,
      experiencia,
      sueldoPretendido,
      especialidad,
      gradoId ,
      idPersona,
    } = req.body as { 
        email: string, 
        password: string, 
        nombre: string, 
        apellidoPat: string, 
        apellidoMat: string,
        telefono:number,
        direccion:string,
        nacimiento:Date,
        tipoId        : number,
        numeroDocumento   : string,
        experiencia     : number,
        sueldoPretendido: number,
        especialidad: string,
        gradoId : number ,
        idPersona:number
    };
    const post = await prisma.postulante.findFirst({
      where:{
        numeroDocumento
      }
    })


    if(post){
      return res.status(400).json({
        message:'Ya existe el numero de documento'
      })
    }

    
    const persona = await prisma.persona.update({
          where: {
            id:idPersona
          },
          data: {
            nombres:nombre,
            apellido_pat:apellidoPat,
            apellido_mat:apellidoMat,
            postulante:{
              create:{
                direccion,
                especialidad,
                experiencia:parseInt(experiencia.toString()) ,
                nacimiento:new Date(nacimiento),
                numeroDocumento,
                sueldo:parseFloat(sueldoPretendido.toString()) ,
                gradoId,
                tipoId,
                telefono:telefono.toString(),
                
              }
            }
          },
        
      } )
       
     

      // postulante:{
      //   create:{
      //       telefono:telefono.toString(),
      //       direccion,
      //       especialidad,
      //       experiencia:parseInt(experiencia.toString()),
      //       fecha_nacimiento:new Date(nacimiento),
      //       sueldo: sueldoPretendido.toString() ,
      //       estado_postulante_id:1,
      //       grado_id:gradoId,
      //       persona_id:1,
      //       numero_documento:numeroDocumento,
      //       tipo_documento_id:1

      //   }
    await prisma.$disconnect()
     return  res.status(200).json( persona );
 
 }

async function updatePostulante(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { 
    nombre ,
    apellidoPat, 
    apellidoMat,
    email,
      telefono,
      direccion,
      nacimiento,
      tipoId ,
      numeroDocumento,
      experiencia,
      sueldoPretendido,
      especialidad,
      gradoId ,
      idPersona,
      idPostulante
    } = req.body as { 
        email: string, 
        password: string, 
        nombre: string, 
        apellidoPat: string, 
        apellidoMat: string,
        telefono:number,
        direccion:string,
        nacimiento:Date,
        tipoId        : number,
        numeroDocumento   : string,
        experiencia     : number,
        sueldoPretendido: number,
        especialidad: string,
        gradoId : number ,
       idPersona:number
        idPostulante:number
    };
    const persona = await prisma.persona.update({
          where: {
            id:idPersona
          },
          data: {
            nombres:nombre,
            apellido_pat:apellidoPat,
            apellido_mat:apellidoMat,
            postulante:{
              update:{
                where: {
                  id:idPostulante
                },
                data:{ 
                  direccion,
                especialidad,
                experiencia:parseInt(experiencia.toString()) ,
                nacimiento:new Date(nacimiento),
                numeroDocumento,
                sueldo:parseFloat(sueldoPretendido.toString()) ,
                gradoId,
                tipoId,
                telefono:telefono.toString(),
              }
               
                
              }
            }
          },
        
      } )
       
  return  res.status(200).json( persona );
 
}


