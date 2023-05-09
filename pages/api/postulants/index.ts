import { IJob, IPostulant } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );


type Data = 
| { message: string }
| IJob[]
| IJob
| any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return createPostulant( req, res );
        case 'PUT':
          return updatePostulante( req, res );
          case 'GET':
            return getPostulante( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
    
 
}

async function  getPostulante(req: NextApiRequest, res: NextApiResponse<any>) {
  const session: any = await getSession({ req });
  if ( !session ) {
      return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
  }

  const id = session.user.persona.id

  const p = await prisma.postulante.findFirst({
    where: {
        persona_id: parseInt(id.toString()) 
    },
    include: {
        persona: true
    }
   
    })

 
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
    estadoCivil,
    exalumno,
    egreso=0,
    hijos,
    discapacidad,
    nivel,



    sueldoPretendido,
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
      gradoId : number ,
      estadoCivil:string,
      exalumno:number,
      egreso:number,
      hijos:number,
      discapacidad:number,
      nivel:string,
     idPersona:number
      idPostulante:number
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
               
                  nacimiento:new Date(nacimiento),
                  numeroDocumento,
                  sueldo:parseFloat(sueldoPretendido.toString()) ,
                  gradoId,
                  tipoId,
                  telefono:telefono.toString(),
                  estado_civil:estadoCivil,
                  exalumno,
                  egreso:parseInt(egreso.toString()),
                  hijos:parseInt(hijos.toString()),

                  discapacidad,
                  nivel
                
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
      estadoCivil,
      exalumno,
      egreso='0',
      hijos,
      discapacidad,
      nivel,


      image,
      sueldoPretendido,
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
        gradoId : number ,
        estadoCivil:string,
        exalumno:number,
        egreso:number,
        hijos:number,
        discapacidad:number,
        nivel:string,
        image:string,
       idPersona:number
        idPostulante:number
    };

    if ( image.length <= 0 ) {
      return res.status(400).json({ message: 'Es Necesario que suba una imagen' });
  }
    const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
    console.log({ image, fileId, extension });
    await cloudinary.uploader.destroy( fileId );
    
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
               image,
                  nacimiento:new Date(nacimiento),
                  numeroDocumento,
                  sueldo:parseFloat(sueldoPretendido.toString()) ,
                  gradoId,
                  tipoId,
                  telefono:telefono.toString(),
                  estado_civil:estadoCivil,
                  exalumno,
                  egreso: isNaN( parseInt(egreso.toString())) || exalumno===0 ? 0:   parseInt(egreso.toString()),
                  hijos:parseInt(hijos.toString()),

                  discapacidad,
                  nivel

              }
               
                
              }
            }
          },
        
      } )
       
  return  res.status(200).json( persona );
 
}


