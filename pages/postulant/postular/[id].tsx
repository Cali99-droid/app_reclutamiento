import { prisma } from '@/server/db/client';

import { JobsLayout } from '@/components/layouts'
import { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'

import { Box, Button, Typography } from '@mui/material';

import { green, grey, } from '@mui/material/colors';
import { ReqList } from '@/components/jobs';
import { IJob } from '@/interfaces';
import { useRouter } from 'next/router';
import Modal from '@/components/modal/Modal';
import { reclutApi } from '@/api';
import { getSession } from 'next-auth/react';

interface Props {

  convocatoria: IJob,
  persona: any

}
const PostularPage: NextPage<Props> = ({ convocatoria, persona }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    postular();
    router.push('/postulant/postulaciones')
  };

  const postular = async () => {
    const { id } = convocatoria;
    const idPostulante = persona.postulante[0].id;

    const datos = {
      id,
      idPostulante
    }

    try {
      const { data } = await reclutApi({
        url: '/postular',
        method: 'POST',  // si tenemos un _id, entonces actualizar, si no crear
        data: datos
      });
      console.log(data)

    } catch (error) {
      console.log(error);
    }

  }
  return (
    <JobsLayout title={"Postular "} pageDescription={'postular a un trabajo'} >
      <Box display='flex' gap={4} justifyContent='center' flexDirection={'column'} alignItems='center' height="calc(80vh - 200px)" width={'100%'} >

        <Box>
          <Box display={'flex'} gap={2}>
            <Typography variant='h1' sx={{ color: grey[800] }}>{`Usted Postulará al puesto de: `}</Typography >
            <Typography variant='h1' sx={{ color: grey[600] }}>{` ${convocatoria.titulo} `}</Typography >
          </Box>

        </Box>
        <Box display={'flex'} justifyContent={'space-between'} width={'40%'}>
          <Box sx={{ bgcolor: grey[100], padding: 2, borderRadius: 4 }}>
            <Typography>Requisitos de la convocatoria</Typography>
            <ReqList job={convocatoria} />
          </Box>
          <Box sx={{ bgcolor: grey[100], padding: 2, borderRadius: 4 }} display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={3}>

            <Button size='medium' color='success' onClick={() => handleOpen()} >Confirmar</Button>
            <Button size='medium' color='info' onClick={() => {
              router.push('/postulant')
            }}>Revisar mi ficha</Button>
            <Button size='medium' color='error' onClick={() => { history.go(-1); return false; }}>Volver</Button>
          </Box>
        </Box>

      </Box>
      <Modal title={'¿ Esta seguro de eliminar la convocatoria ?'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
        <Typography >La Convocatoria se eliminará definitivamente</Typography>

      </Modal>

    </JobsLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {


  const session: any = await getSession({ req });



  const { user } = session;

  const persona = await prisma.persona.findUnique({
    where: {
      id: user.persona.id,
    },
    select: {
      id: true,
      postulante: {
        select: {
          id: true
        },
      }

    }
  })



  const { id = '' } = query
  const idConvocatoria = parseInt(id.toString())
  const convocatoria = await prisma.convocatoria.findUnique({
    where: {
      id: idConvocatoria
    },
    include: {
      grado: true
    }

  })




  return {
    props: {
      convocatoria,
      persona
    }
  }
}

export default PostularPage
