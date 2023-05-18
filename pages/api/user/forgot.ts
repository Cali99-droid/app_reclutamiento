import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

// import { db } from '../../../database';
// import { User } from '../../../models';



import { jwt, validations } from '../../../helpers';
import { generarId } from '@/helpers/functions';
import sendConfirmationEmail from '@/helpers/sendConfirmationEmail';
import { prisma } from '../../../server/db/client';
import { checkUserEmailPassword } from '../../../database/dbUser';
import sendTokenPassword from '@/helpers/sendTokenPassword';


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
   
    const { email = '' } = req.body as { email: string };
     
    
    if ( !validations.isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'El correo no tiene formato de correo'
        });
    }
    
  

   
    const usuario =  await prisma.user.findFirst({
        where: {
          email,
        },
      })

    
  
    if ( !usuario ) {
        return res.status(400).json({
            message:'No existe un usuario con este correo'
        })
    }
   
    const tokenEmail = generarId();

    const userUpdate = await prisma.user.update({
        where:{
            id:usuario.id
        },
        data:{
            token:tokenEmail
        }
    })
   
    
      /**Enviar email de confirmacion */
     await sendTokenPassword(email, tokenEmail)
    //  console.log(tokenEmail)
    await prisma.$disconnect()

   
   


    return res.status(200).json({message:'Correo enviado' })


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

