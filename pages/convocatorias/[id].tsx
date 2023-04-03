import { JobList } from "@/components/jobs/JobList";
import { JobsLayout } from "@/components/layouts";
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { jobs } from '../../database/seed';
import Divider from '@mui/material/Divider';
import { IJob } from "@/interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from 'next/image';


interface Props {
    job: IJob;
}

const ConvocatoriaPage:NextPage<Props>=({job}) =>{
   
  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatoria a trabajos en Ancash"}>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={ 7 }>
                    <Image src={`/jobs/${job.img}.jpg`} alt="altsd" width={500} height={500}/>

                    
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                <Box mt={15}>
                    <Typography variant='h1' component='h1'>Convocatoria: {job.titulo}</Typography>
                    </Box>    
                    <Divider variant="middle" />
                </Grid>
             </Grid>


       
      
    </JobsLayout>
  )
}




export const getStaticPaths: GetStaticPaths = async (ctx) => {
  

    return {
      paths: jobs.map( ( {id} ) => ( 
        {  
        params: {
          id
        }
      })),
      fallback: 'blocking'
    }
  }




export const getStaticProps: GetStaticProps = async ({ params }) => {
  
    const { id = '' } = params as { id: any };
    const job = jobs.filter(job=>job.id !== id)[0];
  
    if ( !job ) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  
    return {
      props: {
        job
      },
      revalidate: 60 * 60 * 24
    }
  }
  
export default ConvocatoriaPage;