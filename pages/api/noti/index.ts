import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

// import { db } from '../../../database';
// import { User } from '../../../models';



import { jwt, validations } from '../../../helpers';
import { generarId } from '@/helpers/functions';
import sendConfirmationEmail from '@/helpers/sendConfirmationEmail';
import { prisma } from '../../../server/db/client';
import { checkUserEmailPassword } from '../../../database/dbUser';
import {sendEmail} from '@/helpers/sendTokenPassword';
import { sendError } from '@/helpers/sendError';


type Data = 
| { message: string }
| {
    token: string;
    user: {
        email: string;
        nombre: string;
        rol_id: number;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return findEmail(req, res)
            case 'PUT':
                return updatePassword(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const findEmail = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
   
   
     
    
   
    const { error = '' } = req.body as { error: string };
  

   
    
  
   
   
    
      /**Enviar email de confirmacion */
      try {
         await sendError(error)
            await prisma.$disconnect()
            return res.status(200).json({message:'Correo enviado' })
      } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Error' })
      }
    
    //  console.log(tokenEmail)
   
   


   


}
async function updatePassword(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { newPassword = '',token } = req.body as { newPassword: string,token:string };
    const usuario =  await prisma.user.findFirst({
        where: {
          token,
        },
      })

    
  
    if ( !usuario ) {
        return res.status(400).json({
            message:'token inválido '
        })
    }
   


    const userUpdate = await prisma.user.update({
        where:{
            id:usuario.id
        },
        data:{
            password:bcrypt.hashSync(newPassword),
            token:''
        }
    })

    return res.status(200).json({message:'password Actualizado' })
}

