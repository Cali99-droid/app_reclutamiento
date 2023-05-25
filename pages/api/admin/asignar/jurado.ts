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
            return setJuradoConvocatoria( req, res );
        case 'GET':
            return getJuradoConvocatoria( req, res );
            
        default:
            return res.status(400).json({ message: 'Bad requestr' });
    }
    
 
}


const setJuradoConvocatoria = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id , jurado } = req.body;
    //evitar repeticion
    const existe = await prisma.convocatoria_x_jurado.findFirst({
        where:{
            convocatoria_id:parseInt(id),
            AND:{
                user_id:jurado, 
            }
        }
    })

    if(!existe){
                try {
                const  juradoNew = await prisma.convocatoria_x_jurado.create({
                    data:{
                        convocatoria_id:parseInt(id),
                        user_id:jurado,

                    },
                    include:{
                        user:true
                    }
                    
                })

                
                await prisma.$disconnect()
                res.status(201).json({juradoNew});
            } catch (error) {
                console.log(error);
                await prisma.$disconnect()
                return res.status(400).json({ message: 'Revisar logs del servidor' });
            }  
    }else{
        await prisma.$disconnect()
        res.status(201).json({message:'Ya está asignado'})
    }
   
   
}

const getJuradoConvocatoria = async(req: NextApiRequest, res: NextApiResponse<Data>)=>{


}

