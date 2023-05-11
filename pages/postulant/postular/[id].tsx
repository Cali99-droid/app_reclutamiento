import { prisma } from '@/server/db/client';

import { JobsLayout } from '@/components/layouts'
import { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'

import { Box, Button, Chip, Typography } from '@mui/material';

import { green, grey, } from '@mui/material/colors';
import { ReqList } from '@/components/jobs';
import { IJob } from '@/interfaces';
import { useRouter } from 'next/router';
import Modal from '@/components/modal/Modal';
import { reclutApi } from '@/api';
import { getSession } from 'next-auth/react';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import CheckIcon from '@mui/icons-material/Check';
interface Props {

  convocatoria: IJob,
  persona: any,
  postulo: boolean

}
const PostularPage: NextPage<Props> = ({ convocatoria, persona, postulo }) => {
  const router = useRouter();




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
            {
              postulo ? (
                <Chip label="Ya se encuentra inscrito" color='warning' variant='outlined' />

              )
                : (
                  <Button startIcon={<CheckIcon />} size='medium' color='success' variant='outlined' onClick={() => handleConfirm()} >Confirmar</Button>
                )
            }


            <Button startIcon={<FilePresentIcon />} size='medium' color='info' variant='outlined' onClick={() => {
              router.push('/postulant/ficha')
            }}>Revisar mi ficha</Button>
            <Button size='medium' color='error' variant='outlined' onClick={() => { history.go(-1); return false; }}>Volver</Button>
          </Box>
        </Box>

      </Box>


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

  const convocatorias = await prisma.postulante_x_convocatoria.findMany({
    where: {
      convocatoria_id: idConvocatoria,
      postulante_id: persona!.postulante[0].id
    }

  })

  let postulo = false;
  if (convocatorias.length > 0) {
    postulo = true
  }




  return {
    props: {
      convocatoria,
      persona,
      postulo
    }
  }
}

export default PostularPage
