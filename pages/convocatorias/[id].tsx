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

const ConvocatoriaPage: NextPage<Props> = ({ convocatoria }) => {

  return (
    <JobsLayout title={`AE | ${convocatoria.titulo} `} pageDescription={convocatoria.descripcion}>

      <Grid className="fadeIn" container sx={{ mt: 10, padding: 5 }} direction="column"
        justifyContent="center"
        alignItems="center">

        <Grid item xs={12} sm={12} >
          <Box bgcolor={'#F8F8F8'} padding={3} borderRadius={10}>
            <Box>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant='h1' fontSize={50} component='h1'>
                  {convocatoria.titulo}

                </Typography>
                <IconButton aria-label="share" >
                  <ShareIcon />
                </IconButton>

              </Box>


              <Typography variant='subtitle1' component='p' sx={{ mt: 2, width: '100%' }} color={grey}>{convocatoria.descripcion}</Typography>

            </Box>
            <Divider variant="middle" />
            <Box sx={{ mt: 4 }} >

              <Typography variant='h5' component='h5'> Requisitos</Typography>
              <Divider variant="middle" />
              <ReqList job={convocatoria} />

            </Box>
            <Button sx={{ mt: 3, width: '50%' }} size="large" href={`/postulant/postular/${convocatoria.id}`}>
              Postular
            </Button>
          </Box>


        </Grid>


      </Grid>




    </JobsLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await prisma.convocatoria.findMany();


  return {
    paths: productSlugs.map(({ id }) => ({
      params: {
        id: id.toString()
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
      estado: {
        select: { nombre: true },
      },
      grado: {
        select: { nombre: true },
      }

    },
  });
  await prisma.$disconnect()

  return {
    props: { convocatoria },
  };
};

export default ConvocatoriaPage;