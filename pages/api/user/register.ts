import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../helpers';
import { generarId } from '@/helpers/functions';
import sendConfirmationEmail from '@/helpers/sendConfirmationEmail';
import { prisma } from '../../../server/db/client';
import { checkUserEmailPassword } from '../../../database/dbUser';
import crearContacto from '@/helpers/mauticApi';



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
        case 'PUT':
            return updateUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
   
    const { email = '', password = '', nombre = '',apellidoPat, apellidoMat,fechaNac, tipoId, numeroDocumento } = req.body as { email: string, password: string, nombre: string, apellidoPat: string, apellidoMat: string,fechaNac:Date, tipoId: number, numeroDocumento: string };
     
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
    if ( !fechaNac  ) {
        return res.status(400).json({
            message: 'Se requiere una fecha de nacimiento'
        });
    }
    if ( !validations.isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'El correo no tiene formato de correo'
        });
    }
    if(!validations.validarCorreo(email)){
        return res.status(400).json({
            message: 'Tu email no puedes tener el dominio @ae.edu.pe'
        });
    }
    
  

   
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
    const pos =  await prisma.postulante.findFirst({
        where: {
          numeroDocumento,
        },
      })
      if ( pos ) {
        return res.status(400).json({
            message:'Este numero de documento ya existe'
        })
    }
    const tokenEmail = generarId();
    const persona = await prisma.persona.create({
        data: {
          apellido_pat:apellidoPat,
          apellido_mat: apellidoMat,
          nombres:nombre,
          user:{
            create:{
                email:email.toLocaleLowerCase() ,
                password:bcrypt.hashSync( password ),
                token:tokenEmail,
                rol:{
                    connect: {
                        id: 1
                    },
                }
                
            }
          } ,
          postulante:{
            create:{
                direccion:'',
                experiencia:0 ,
                nacimiento:new Date(fechaNac),
                numeroDocumento,
                sueldo:0 ,
                gradoId:1,
                tipoId,
                telefono:'',
                
              }
          }
        },
        include: {
            user: true, 
          },
      })
      /**Enviar email de confirmacion */
    // await sendConfirmationEmail(email, tokenEmail)

     // ** API mautic 
     try {
        const apellidos =  apellidoPat + ' '+apellidoMat;
     crearContacto(nombre, email, tokenEmail,apellidos)
     .then(() => {
       console.log('Contacto creado exitosamente');
     })
     .catch((error) => {
       console.error('Error al crear el contacto:', error);
       
     });
     } catch (error) {
        return res.status(400).json({
        message:'Hubo un error al crear contacto'
            })
     }
     
    // //  console.log(tokenEmail)
    await prisma.$disconnect()
    const newUser = persona.user[0];
    const{id,rol_id} = newUser ;

   
    const token = jwt.signToken( id.toString(), email )

    return res.status(200).json({
        token, //jwt
        user: {
            email, 
            rol_id, 
            nombre,
        }
    })


}
async function updateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {idPersona , password = '', nombre = '',apellidoPat, apellidoMat,newPassword='',email=''} = req.body as {idPersona:number, password: string, nombre: string, apellidoPat: string, apellidoMat: string, newPassword:string,email:string};

    const resultado = await checkUserEmailPassword(email,password)

    if(resultado === null){
        return res.status(400).json({
            message: 'Las contraseña anterior es incorrecta'
        });
    }
    if ( newPassword.length < 6 ) {
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

    // const userUpdate = await prisma.user.update({
    //     where:{
    //         email
    //     },data:{
    //           password:bcrypt.hashSync( newPassword )
    //     }
   
          
       
    // })

    const persona = await prisma.persona.update({
        where: {
          id:idPersona
        },
        data: {
          nombres:nombre,
          apellido_pat:apellidoPat,
          apellido_mat:apellidoMat,
          user:{
            update:{
                where: {
                email
              },
              data:{
                password:bcrypt.hashSync( newPassword )
              } 
            }
          }
        },
         
    } )

    return res.status(200).json({
        message: 'Datos actualizados correctamente'
        
    })
}

