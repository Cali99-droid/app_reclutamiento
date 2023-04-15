import { PrismaClient } from '@prisma/client'

export const getConvocatoriaById= async(id:string)=>{
    const prisma = new PrismaClient()

    const job = await prisma.convocatoria.findUnique({
        where: {
          id: parseInt(id),
        },
      })

      await prisma.$disconnect()

    return job;

}