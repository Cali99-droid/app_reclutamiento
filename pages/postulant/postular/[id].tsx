import { prisma } from '@/server/db/client';

import { JobsLayout } from '@/components/layouts'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { convocatoria } from '@prisma/client';
import { Box, Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { green, grey, pink, teal } from '@mui/material/colors';
import { ReqList } from '@/components/jobs';
import { IJob } from '@/interfaces';
interface Props{

  convocatoria:IJob
  
}
const PostularPage: NextPage<Props> = ({convocatoria}) => {
  return (
    <JobsLayout title={"Postularme "} pageDescription={'postular aun trabajo'} >
       <Box display='flex' gap={4} justifyContent='center' flexDirection={'column'} alignItems='center' height="calc(70vh - 200px)" width={'100%'} >   

              <Box  display={'flex'} justifyContent={'space-between'} >
                <Box display={'flex'} gap={2}>
                  <Typography variant='h1' sx={{color:grey[800]}}>{`Usted Postulará a: `}</Typography >
                  <Typography variant='h1' sx={{color:grey[600]}}>{` ${convocatoria.titulo} `}</Typography >
                </Box>
                
              </Box>
              <Box display={'flex'} justifyContent={'space-between'} width={'40%'}>
                 <Box sx={{bgcolor:grey[100], padding:2, borderRadius:4}}>
                     <Typography>Requisitos de la convocatoria</Typography>
                     <ReqList job={convocatoria} />
                 </Box>
                 <Box sx={{bgcolor:grey[100], padding:2, borderRadius:4}} display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={3}>
                 
                     <Button size='medium'sx={{bgcolor:green[500]}} >Postular</Button>
                     <Button size='medium' sx={{bgcolor:teal[500]}}>Revisar mi ficha</Button>
                     <Button size='medium'sx={{bgcolor:pink[500]}}>Volver</Button>
                 </Box>
              </Box>
            
       </Box>
   
        
    </JobsLayout>
  )
}


export const getServerSideProps: GetServerSideProps  = async ({ query }) => {

  const {id=''} = query
  const idConvocatoria = parseInt(id.toString())
  const convocatoria = await prisma.convocatoria.findUnique({
    where:{
      id:idConvocatoria
    },
    include:{
      grado:true
    }
    
  })

  console.log(convocatoria)


return {
  props:{
    convocatoria
  }
}
}

export default PostularPage
