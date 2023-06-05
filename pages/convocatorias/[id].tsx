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
  const url = `https://app-reclutamiento-xpma.vercel.app/${router.asPath}`;

  const [open, setOpen] = useState(false);



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
                <IconButton aria-label="share" onClick={() => setOpen(true)}>
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

      <ModalAlert title={'Compartir en:'} open={open} handleClose={() => setOpen(false)} handleConfirm={() => setOpen(false)}>
        <Box display={'flex'} justifyContent={'space-evenly'} width={300}>
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