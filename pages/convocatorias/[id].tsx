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
import Image from 'next/image';
import PostAddIcon from '@mui/icons-material/PostAdd';



interface Props {
  convocatoria: IJob;
}

const ConvocatoriaPage: NextPage<Props> = ({ convocatoria }) => {

  return (
    <JobsLayout title={`AE | ${convocatoria.titulo} `} pageDescription={convocatoria.descripcion}>

      <Box className="fadeIn" sx={{ mt: 10, padding: 6 }} display={'flex'}
        gap={4}
        alignItems="self-start" justifyContent={'center'} width={'80%'} margin={'auto'}>

        <Box>
          <Image src={'/jobs/img-6.jpg'} alt={''} width={500} height={500} />
        </Box>

        <Box padding={3} borderRadius={10}>
          <Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant='h1' component='h1'>
                {convocatoria.titulo}

              </Typography>
              <Box>
                <IconButton aria-label="share" >
                  <ShareIcon />
                </IconButton>
              </Box>


            </Box>


            <Typography variant='subtitle1' component='p' sx={{ mt: 2, width: '100%' }} color={grey}>{convocatoria.descripcion}</Typography>

          </Box>
          <Divider variant="middle" />
          <Box sx={{ mt: 2 }} >



            <ReqList job={convocatoria} />

          </Box>
          <Button startIcon={<PostAddIcon />} color='info' sx={{ mt: 6, width: '100%' }} size="large" href={`/postulant/postular/${convocatoria.id}`}>
            Postular
          </Button>
        </Box>


      </Box>







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