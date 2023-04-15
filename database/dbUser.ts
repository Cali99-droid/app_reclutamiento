import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcryptjs';
export const checkUserEmailPassword = async(email:string, password: string)=>{
   
    const prisma = new PrismaClient()

    const user =  await prisma.user.findFirst({
        where: {
          email,
        },include:{
            persona:true,
            rol:true
        }
      })
    await prisma.$disconnect()

    if(!user){
        return null;
    }

    if(!bcrypt.compareSync(password, user.password!)){
        return null;
    }

    const {rol_id, id,persona,rol} = user;

    return{
        id:id.toString(),
        email,
        rol_id,
        persona,rol
    }
}

//funtioo ppara crear un uaurio mediante oauth
export const oAuthToDbUser = async(oAuthEmail:string, oAuthName:string,oAuthImg:string)=>{
    const prisma = new PrismaClient()

    const user =  await prisma.user.findFirst({
        where: {
           email: oAuthEmail,
        },include:{
            persona:true,
            rol:true
        }
      })
    if(user){
        await prisma.$disconnect()
        const {rol_id,email, id,persona,rol} = user;
        return {rol_id,email, id,persona,rol}
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
                rol:{
                    connect: {
                        id: 1
                    },
                }
            }
          } ,
        },
        include: {
            user: true,
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

    return {id, rol_id,email,oAuthImg,oAuthName,rol};
}