import { IPostulant } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db/client';
import { getSession } from 'next-auth/react';


type Data = 
| { message: string } 
| IPostulant

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;

    // if ( !mongoose.isValidObjectId( id ) ) {
    //     return res.status(400).json({ message: 'El id no es válido ' + id })
    // }
    
    switch ( req.method ) {
      

        case 'GET':
            return getPostulante( req, res );
       

            
        default:
            return res.status(400).json({ message: 'Método no existe ' + req.method });
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

      console.log(p)
      return res.status(200).json(p)
  }

