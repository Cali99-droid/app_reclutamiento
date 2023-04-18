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
        case 'POST':
            return createPostulant( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}

const createPostulant = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { 
    nombre = '',
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
    };
    const persona = await prisma.persona.create({
        data: {
          apellido_pat:apellidoPat,
          apellido_mat: apellidoMat,
          nombres:nombre,
          postulante:{
            create:{
                telefono:telefono.toString(),
                direccion,
                especialidad,
                experiencia,
                fecha_nacimiento:nacimiento,
                sueldo: sueldoPretendido.toString() ,
                estado_postulante_id:1,
                grado_id:gradoId,
                persona_id:1,
                numero_documento:numeroDocumento,
                tipo_documento_id:tipoId

            }
          }
        },
        include: {
            postulante: true, // Include all posts in the returned object
          },
      })
    await prisma.$disconnect()
     return  res.status(200).json( persona );
 
 }
 