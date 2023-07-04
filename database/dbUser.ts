

import bcrypt from 'bcryptjs';
import { prisma } from '../server/db/client';

export const checkUserEmailPassword = async(email:string, password: string)=>{
   


    const user =  await prisma.user.findFirst({
        where: {
          email,
        },include:{
            persona:{
                include:{
                    postulante:{
                        select:{
                            id:true
                        }
                    }
                }
            },
        
            rol:true
        }
      })
    await prisma.$disconnect()

    if(!user){
        return null;
    }
    if(user.confirmado === 0){
        return null;
    }

    if(!bcrypt.compareSync(password, user.password!)){
        return null;
    }

    const {rol_id, id,persona,rol} = user;
    // const pos :any = persona.postulante;
    // const idPos = pos.id;

    return{
        id:id.toString(),
        email,
        rol_id,
        persona,
        rol,
     
    }
}

//funtioo ppara crear un uaurio mediante oauth
export const oAuthToDbUser = async(oAuthEmail:string, oAuthName:string,oAuthImg:string)=>{


    const user =  await prisma.user.findFirst({
        where: {
           email: oAuthEmail,
        },include:{
            persona:{
                include:{
                    postulante:{
                        select:{
                            id:true
                        }
                    }
                }
            },
            rol:true
        }
      })
    if(user){
        await prisma.$disconnect()
        const {rol_id,email, id,persona,rol,img} = user;
        return {rol_id,email, id,persona,rol,img}
    }

    const persona = await prisma.persona.create({
        data: {
          apellido_pat:'',
          apellido_mat: '',
          nombres: oAuthName,
  
          user:{
            create:{
                email:oAuthEmail.toLocaleLowerCase() ,
                password:'@',
                img:oAuthImg,
                confirmado:1,
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
                nacimiento:new Date(),
                numeroDocumento:null,
                sueldo:0 ,
                gradoId:1,
                tipoId:1,
                telefono:'',
                
              }
          }
        },
        include: {
            user: true,
            postulante:true,
           // Include all posts in the returned object
          },
      })

 
    await prisma.$disconnect()
    const newUser = persona.user[0];
    const userNew =  await prisma.user.findFirst({
        where: {
           email: newUser.email,
        },include:{
            rol:true
        }
      })
    const rol = userNew?.rol;
    const{email} = newUser ;
    const id = newUser.id.toString()
    const rol_id = newUser.rol_id.toString()
  

    return {id, rol_id,email,oAuthImg,oAuthName,rol,persona};
}