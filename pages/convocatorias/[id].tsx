import { prisma } from '@/server/db/client';
import { JobsLayout } from "@/components/layouts";
import { Box, Button, Grid, IconButton, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { IJob } from "@/interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { ReqList } from "@/components/jobs/ReqList";
import ShareIcon from '@mui/icons-material/Share';

import { grey } from '@mui/material/colors';
import Image from 'next/image';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useRouter } from 'next/router';
import ModalAlert from '../../components/modal/ModalAlert';
import { useState } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import moment from 'moment';
interface Props {
  convocatoria: IJob;
  w: Window & typeof globalThis;
}

const ConvocatoriaPage: NextPage<Props> = ({ convocatoria }) => {
  const router = useRouter();
  const url = `https://talentohumano.colegioae.edu.pe${router.asPath}`;

  const [open, setOpen] = useState(false);
  const matches = useMediaQuery('(min-width:1600px)');
  const sl = useMediaQuery('(min-width:1600px)');
  return (
    <JobsLayout title={`AE | ${convocatoria.titulo} `} pageDescription={`Regístrate y postula a esta convocatoria ${convocatoria.titulo} `} imageFullUrl={`${convocatoria.img}`}>

      <Box
        className="fadeIn" sx={{ mt: 20, }} display={'flex'}
        gap={4}
        alignItems="center" justifyContent={'center'} width={matches ? '50%' : '90%'} margin={'auto'}

        flexDirection={matches ? 'row' : 'column'}
        bgcolor={'#F1F1F1'}
        padding={2}
        borderRadius={4}
      >

        <Box>
          <Image src={`https://caebucket.s3.us-west-2.amazonaws.com/img/${convocatoria.img}`} alt={''} width={matches ? 500 : 350} height={matches ? 500 : 350} priority />
        </Box>

        <Box borderRadius={4} padding={2}>
          <Box >
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant='h1' component='h1' >
                {convocatoria.titulo.toLocaleUpperCase()}

              </Typography>
              <Box>
                <IconButton aria-label="share" onClick={() => setOpen(true)}>
                  <ShareIcon />
                </IconButton>

              </Box>


            </Box>
            <div dangerouslySetInnerHTML={{ __html: convocatoria.descripcion }} />
            {/* {convocatoria.descripcion} */}

            {/* <Typography variant='body1' component='p' sx={{ mt: 2, width: '100%' }} color={'#767687'}  ></Typography> */}

          </Box>
          <Divider variant="middle" />
          <Box sx={{ mt: 2 }} >



            <ReqList job={convocatoria} />

          </Box>
          <Box mt={1}>

            <span style={{ color: '#767687' }}>

              Vigente hasta: {moment(convocatoria.vigencia).add(1, 'days').toDate().toLocaleDateString()}
            </span>
          </Box>
          <Button startIcon={<PostAddIcon />} color='secondary' sx={{ mt: 6, width: '100%' }} size="large" href={`/postulant/postular/${convocatoria.id}`}>
            Postular
          </Button>
        </Box>


      </Box>

      <ModalAlert title={'Compartir en:'} open={open} handleClose={() => setOpen(false)} handleConfirm={() => setOpen(false)} >
        <Box display={'flex'} justifyContent={'space-evenly'} width={matches ? 300 : 160}>
          <IconButton size='large' aria-label="add to shopping cart" target='_blank' href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
            <FacebookOutlinedIcon fontSize="inherit" />
          </IconButton>
          <IconButton size='large' aria-label="add to shopping cart" target='_blank' href={`https://api.whatsapp.com/send?text=Postula%20a%20este%20empleo%20de%20desde%20este%20enlace,%20${url}`}>
            <WhatsAppIcon fontSize="inherit" />
          </IconButton>
          <IconButton size='large' aria-label="add to shopping cart" target='_blank' href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}>
            <LinkedInIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </ModalAlert>







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

  const convo = await prisma.convocatoria.findUnique({
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

  if (!convo) {
    return {
      redirect: {
        destination: '/convocatorias',
        permanent: false,
      }
    }
  }
  await prisma.$disconnect()
  const convocatoria = JSON.parse(JSON.stringify(convo))
  return {
    props: { convocatoria },
    revalidate: 1
  };
};

export default ConvocatoriaPage;