import { prisma } from '@/server/db/client';
import { JobsLayout } from "@/components/layouts";
import { Box, Button, Grid, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IJob } from "@/interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { ReqList } from "@/components/jobs/ReqList";
import ShareIcon from '@mui/icons-material/Share';
import { convocatoria } from '@prisma/client';
import { grey } from '@mui/material/colors';



interface Props {
  convocatoria: IJob;
}

const ConvocatoriaPage:NextPage<Props>=({convocatoria}) =>{
   
  return (
    <JobsLayout title={`AE | ${convocatoria.titulo} `} pageDescription={convocatoria.descripcion}>

             <Grid className="fadeIn"  container spacing={4} sx={{mt:15,padding:5}} alignItems={'start'}>

                <Grid item xs={ 12 } sm={ 6 } >
                  <Box bgcolor={'#F8F8F8'} padding={3} borderRadius={10}>
                    <Box>
                        <Box display={'flex'}>
                          <Typography variant='h1' component='h1'> 
                            {convocatoria.titulo} 
                            <IconButton aria-label="share" >
                                    <ShareIcon />
                            </IconButton>
                          </Typography> 
                          
                        </Box>
                          
                          
                          <Typography variant='subtitle1' component='p' sx={{mt:2, width:'100%'}} color={grey}>{convocatoria.descripcion}</Typography>
                          
                      </Box>    
                      <Divider variant="middle" />
                      <Box sx={{mt:4}} >
                    
                        <Typography variant='h5' component='h5'> Requisitos</Typography> 
                        <Divider variant="middle" />
                        <ReqList job={convocatoria} /> 
                        <Typography variant='h5' component='h5'> # Vacantes: {convocatoria.vacantes}</Typography>  
                      </Box>


                  </Box>
                   
                   
                </Grid>

                <Grid item xs={ 12 } sm={ 6 } >
                    <Button  sx={{mt:3, width:'80%'}} size="large" >
                          Postular
                    </Button> 
                </Grid>
             </Grid>


       
      
    </JobsLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await  prisma.convocatoria.findMany();

  
  return {
    paths: productSlugs.map( ({ id }) => ({
      params: {
        id:id.toString()
      }
    })),
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

   const convocatoria = await prisma.convocatoria.findUnique({
    where: {
      id: Number(params?.id),
    },
      include: {
        estado:{
          select: {  nombre: true},  
        },
        grado:{
          select: {  nombre: true},  
        }

    },
  });
  await prisma.$disconnect()
  console.log(convocatoria)
  return {
    props:{ convocatoria},
  };
};
  
export default ConvocatoriaPage;