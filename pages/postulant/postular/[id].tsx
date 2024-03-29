import { prisma } from '@/server/db/client';

import { JobsLayout } from '@/components/layouts'
import { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'

import { Box, Button, Chip, FormHelperText, Paper, Typography, styled, useMediaQuery } from '@mui/material';

import { green, grey, } from '@mui/material/colors';
import { ReqList } from '@/components/jobs';
import { IJob } from '@/interfaces';
import { useRouter } from 'next/router';
import Modal from '@/components/modal/Modal';
import { reclutApi } from '@/apies';
import { getSession } from 'next-auth/react';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import CheckIcon from '@mui/icons-material/Check';
import NextLink from 'next/link';
import { Link } from 'react-router-dom';
import { Footer } from '@/views/HomePage/Footer';

interface Props {

  convocatoria: IJob,
  persona: any,
  postulo: boolean

}
const PostularPage: NextPage<Props> = ({ convocatoria, persona, postulo }) => {
  const router = useRouter();




  const handleConfirm = async () => {
    postular();
    router.push('/postulant/postulaciones?val=2')
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
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#eeeeee',
    ...theme.typography.body2,
    padding: theme.spacing(3),

    color: theme.palette.text.secondary,
    borderRadius: 10


  }));

  const matches = useMediaQuery('(min-width:600px)');
  return (
    <JobsLayout title={"Postular "} pageDescription={'postular a un trabajo'} >
      <Box display='flex' justifyContent='center' mt={15} width={'100%'} padding={5}>

        <Item sx={{ margin: '0 auto' }}>
          <Box display={'flex'} gap={1} justifyContent={'center'} flexDirection={matches ? 'row' : 'column'}>
            <Typography fontSize={20} fontWeight={500} sx={{ color: grey[800] }}>{`Confirme su postulación a: `}</Typography >
            <Typography fontSize={20} fontWeight={800} sx={{ color: '#001C75' }}>{` ${convocatoria.titulo} `}</Typography >

          </Box>
          <Box width={'70%'} sx={{ margin: '0 auto' }}>
            <FormHelperText>*Asegurese de haber llenado correctamente su ficha,
              si no no hizo, puede actualizarlo en cualquier momento <a href={'/postulant'} target='_blank'>
                desde aqui
              </a></FormHelperText>
          </Box>



          <Item sx={{ padding: 2, borderRadius: 4, mt: 2, bgcolor: '#FFF' }} >

            <Box display={'flex'} gap={4} flexDirection={matches ? 'row' : 'column'} justifyContent={'center'}>
              <Button
                startIcon={<FilePresentIcon />}
                size='medium'
                color='info'
                variant='outlined'
                onClick={() => {
                  router.push('/postulant/ficha')
                }}>
                Ver mi ficha
              </Button>
              {
                postulo ? (
                  <Chip label="Ya se encuentra inscrito" color='warning' variant='outlined' />

                )
                  : (
                    <Button startIcon={<CheckIcon />} size='medium' color='success' variant='outlined' onClick={() => handleConfirm()} >Confirmar</Button>
                  )
              }

              <Button
                size='medium'
                color='error'
                variant='outlined'
                onClick={() => { history.go(-1); return false; }}>
                Volver
              </Button>
            </Box>
          </Item>
        </Item>









      </Box>
      <Box padding={4} display='flex' justifyContent='center'>
        {/* <FormHelperText>*Si tienes dudas de cómo postular, puedes consultar en <a href={'/docentes'} target='_blank'> ¿Cómo postular?
        </a></FormHelperText> */}
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


  if (!persona) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }



  const { id = '' } = query
  const idConvocatoria = parseInt(id.toString())
  const convocatoriares = await prisma.convocatoria.findUnique({
    where: {
      id: idConvocatoria
    },
    include: {
      grado: true
    }

  })

  if (!convocatoriares) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }


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

  const convocatoria = JSON.parse(JSON.stringify(convocatoriares))


  return {
    props: {
      convocatoria,
      persona,
      postulo
    }
  }
}

export default PostularPage
