import { JobList } from "@/components/jobs/JobList";
import { JobsLayout } from "@/components/layouts";
import { Box, Button, Grid, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { jobs } from '../../database/seed';
import Divider from '@mui/material/Divider';
import { IJob } from "@/interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from 'next/image';
import { ReqList } from "@/components/jobs/ReqList";
import ShareIcon from '@mui/icons-material/Share';


interface Props {
    job: IJob;
}

const ConvocatoriaPage:NextPage<Props>=({job}) =>{
   
  return (
    <JobsLayout title={`AE | ${job.titulo} `} pageDescription={job.descripcion}>

             <Grid className="fadeIn"  container spacing={1} sx={{mt:15,padding:5}} alignItems={'start'}>

                <Grid item xs={12} sm={ 7 }>
                    <Image className="fadeIn" src={`/jobs/${job.img}.jpg`} alt={job.descripcion} width={650} height={650}/>    
                </Grid>
                <Grid item xs={ 12 } sm={ 5 } >
                    <Box width={600}>
                        <Typography variant='h1' component='h1'> 
                          {job.titulo} 
                          <IconButton aria-label="share" >
                                  <ShareIcon />
                          </IconButton>
                        </Typography>
                        <Typography  component='p' sx={{mt:2, width:'100%'}}>{job.descripcion}</Typography>
                    </Box>    
                    <Divider variant="middle" />
                    <Box sx={{mt:4}} width={600}>
                   
                      <Typography variant='h5' component='h5'> Requisitos</Typography> 
                      <Divider variant="middle" />
                      <ReqList job={job} />
                      <Typography variant='h5' component='h5'> # Vacantes: {job.vacantes}</Typography>  <Button fullWidth sx={{mt:3}} size="large">
                      Postular
                    </Button>    
                    </Box>

                   
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
    const job = jobs.filter(job=>job.id === id)[0];
  
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