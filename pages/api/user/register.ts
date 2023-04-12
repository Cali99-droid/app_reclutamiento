import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

// import { db } from '../../../database';
// import { User } from '../../../models';
import { PrismaClient } from '@prisma/client'


import { jwt, validations } from '../../../helpers';


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
            return registerUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
   
    const { email = '', password = '', nombre = '',apellidoPat, apellidoMat } = req.body as { email: string, password: string, nombre: string, apellidoPat: string, apellidoMat: string };
     
    if ( password.length < 6 ) {
        return res.status(400).json({
            message: 'La contraseña debe de ser de 6 caracteres'
        });
    }

    if ( nombre.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser de 2 caracteres'
        });
    }
    if ( apellidoPat.length < 2 ) {
        return res.status(400).json({
            message: 'El apellido debe de ser de 2 caracteres'
        });
    }
    if ( apellidoMat.length < 2 ) {
        return res.status(400).json({
            message: 'El apellido debe de ser de 2 caracteres'
        });
    }
    
    if ( !validations.isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'El correo no tiene formato de correo'
        });
    }
    
    const prisma = new PrismaClient()

   
    const usuario =  await prisma.user.findFirst({
        where: {
          email,
        },
      })

 

    if ( usuario ) {
        return res.status(400).json({
            message:'Este correo ya esta registrado'
        })
    }

    const persona = await prisma.persona.create({
        data: {
          apellido_pat:apellidoPat,
          apellido_mat: apellidoMat,
          nombres:nombre,
          user:{
            create:{
                email:email.toLocaleLowerCase() ,
                password:bcrypt.hashSync( password ),
                rol:{
                    connect: {
                        id: 1
                    },
                }
            }
          } ,
        },
        include: {
            user: true, // Include all posts in the returned object
          },
      })

  const newUser = persona.user[0];
    const{id,rol_id} = newUser ;

   
    const token = jwt.signToken( id.toString(), email );

    return res.status(200).json({
        token, //jwt
        user: {
            email, 
            rol_id, 
            nombre,
        }
    })


}
