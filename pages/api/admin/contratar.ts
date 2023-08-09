import { IJob } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { capacitacion, persona } from '@prisma/client';




type Data = 
| { message: string }
| IJob[]
| IJob
| any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return postContrato( req, res );

            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}


const postContrato = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {idPosConv,   monto, idPos} = req.body;
//Verificar que hay subido todos sus documentos de sustento


    const estudios = await prisma.estudios.findMany({
        where:{
            postulante_id:idPos,    
            AND:{
                doc:null
            }  
        }
    });

    if(estudios.length>0){
        await prisma.$disconnect()
        return res.status(404).json({ message: 'El postulante no puede ser contratado porque aún no subió un documento de sustento de alguno de sus estudios' });
    }

//--cargos...........----------
    const cargos = await prisma.cargo.findMany({
        where:{
            postulante_id:idPos,    
            AND:{
                doc:null
            } 
        }
    });

    if(cargos.length>0){
        await prisma.$disconnect()
        return res.status(404).json({ message: 'El postulante no puede ser contratado porque aún no subió un documento de sustento de alguno de sus cargos' });
    }
   

  //---capacitaciones----      
    const capacitaciones = await prisma.capacitacion.findMany({
        where:{
            postulante_id:idPos,    
            AND:{
                doc:null
            }  
        }
    });

    if(capacitaciones.length>0){
        await prisma.$disconnect()
        return res.status(404).json({ message: 'El postulante no puede ser contratado porque aún no subió un documento de sustento de alguno de sus capacitaciones' });
    }
 //-----reconocimiento
    const reconocimientos = await prisma.reconocimiento.findMany({
        where:{
            postulante_id:idPos,    
            AND:{
                doc:null
            } 
        }
    });

    if(reconocimientos.length>0){
        await prisma.$disconnect()
        return res.status(404).json({ message: 'El postulante no puede ser contratado porque aún no subió un documento de sustento de alguno de sus reconocimientos' });
    }


    try {
      const  convocatoria = await prisma.postulante_x_convocatoria.update({
        where: {
          id:idPosConv
        },
        data: {
          
            monto: parseInt(monto),
            estado_postulante_id:7,
            fecha_cambio: new Date()
          
        },
      })

      const per = await prisma.postulante.findFirst({
        where:{
            id:idPos
        },
        select:{
            persona:true
        }
      })

      const user = await prisma.user.updateMany({
        data:{
            rol_id:7
        },where:{
            persona_id:per?.persona.id
        }
      })

      
      await prisma.$disconnect()
      res.status(201).json({convocatoria});
  } catch (error) {
      console.log(error);
      await prisma.$disconnect()
      return res.status(400).json({ message: 'Revisar logs del servidor' });
   } finally {
    await prisma.$disconnect();
  }
   
}

