import { prisma } from '@/server/db/client';
import { JobsLayout } from "@/components/layouts";
import { Box, Button, Grid, IconButton, useMediaQuery } from '@mui/material';
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
import { useRouter } from 'next/router';
import ModalAlert from '../../components/modal/ModalAlert';
import { useState } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
interface Props {
  convocatoria: IJob;
  w: Window & typeof globalThis;
}

const ConvocatoriaPage: NextPage<Props> = ({ convocatoria }) => {
  const router = useRouter();
  const url = `https://app-reclutamiento-xpma.vercel.app${router.asPath}`;

  const [open, setOpen] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <JobsLayout title={`AE | ${convocatoria.titulo} `} pageDescription={convocatoria.descripcion}>

      <Box
        className="fadeIn" sx={{ mt: 20, }} display={'flex'}
        gap={4}
        alignItems="center" justifyContent={'center'} width={'80%'} margin={'auto'}

        flexDirection={matches ? 'row' : 'column'}

      >

        <Box>
          <Image src={'/img/img-2.jpg'} alt={''} width={matches ? 500 : 300} height={matches ? 500 : 300} />
        </Box>

        <Box borderRadius={4} bgcolor={'#0045AA'} padding={2}>
          <Box >
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant='h1' component='h1' sx={{ color: '#FFF' }}>
                {convocatoria.titulo.toLocaleUpperCase()}

              </Typography>
              <Box>
                <IconButton sx={{ color: '#FFF' }} aria-label="share" onClick={() => setOpen(true)}>
                  <ShareIcon />
                </IconButton>

              </Box>


            </Box>


            <Typography variant='body1' component='p' sx={{ mt: 2, width: '100%' }} color={'#F1F1E6'} >{convocatoria.descripcion}</Typography>

          </Box>
          <Divider variant="middle" />
          <Box sx={{ mt: 2 }} >



            <ReqList job={convocatoria} />

          </Box>
          <Button startIcon={<PostAddIcon />} color='primary' sx={{ mt: 6, width: '100%' }} size="large" href={`/postulant/postular/${convocatoria.id}`}>
            Postular
          </Button>
        </Box>


      </Box>
      <Box>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0045aa" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
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
  await prisma.$disconnect()
  const convocatoria = JSON.parse(JSON.stringify(convo))
  return {
    props: { convocatoria },
  };
};

export default ConvocatoriaPage;