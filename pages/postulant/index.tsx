import { prisma } from '@/server/db/client';
import { JobsLayout } from "@/components/layouts";

import { Box, Divider, Paper, Typography, useMediaQuery } from '@mui/material';

import { GetServerSideProps, NextPage } from "next";
import { IGrado, IPersona } from "@/interfaces";
import { getSession } from 'next-auth/react';

import { apiCon } from '@/apies';

import { postulante, persona } from '@prisma/client';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContext } from 'react';

import { FormDatos } from '../../components/postulants/FormDatos';
import Form from '@/components/pasos/Form';
import { DatosContext } from '@/context';


interface Props {



  postulante: postulante

}


const PostulantPage: NextPage<Props> = ({ postulante }) => {
  const { activeStep } = useContext(DatosContext)

  return (
    <JobsLayout title={"AE | Postulante "} pageDescription={"Postular a un empleo"}>
      <ToastContainer />
      <Box bgcolor={'#EDF1F7'} paddingBottom={6} mt={5}>

        <Box className="fadeIn" maxWidth={1200} sx={{ margin: 'auto' }} paddingLeft={4} paddingRight={4} pt={15}>
          <Box paddingBottom={2}>
            <Typography variant='h2' fontWeight={'bold'}>Actualizar Mi Ficha</Typography>
            <Divider />
          </Box>
          <Form />
          {
            activeStep === 0 && (
              <FormDatos postulante={postulante} />
            )
          }

        </Box>

        {/* <FormDatos grados={grados} persona={persona} postulante={postulante} /> */}

      </Box>
    </JobsLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  let postulante
  const session: any = await getSession({ req });

  const { user } = session;



  const post = await prisma.postulante.findFirst({
    where: {
      persona_id: parseInt(user.persona.id)
    },
    include: {
      persona: {
        include: {
          user: {
            select: {
              email: true
            }
          }
        }
      },
      estudios: true,
      cargo: true,
      investigacion: true,
      capacitacion: true,
      aficion: true,
      reconocimiento: true,
      tics: true

    }
  })
  const person = await prisma.persona.findUnique({
    where: {
      id: user.persona.id,
    },
    include: {
      postulante: true,
      user: {
        select: {
          email: true
        }
      }
    }
  })

  // const persona = JSON.parse(JSON.stringify(person))
  // if (person?.postulante[0] === undefined) {
  //   const post = {
  //     postulanteId: 0,
  //     id: 0,
  //     telefono: '9',
  //     direccion: '',
  //     nacimiento: '1999-02-14',
  //     tipoId: null,
  //     numeroDocumento: '',
  //     experiencia: null,
  //     sueldo: null,
  //     especialidad: null,
  //     gradoId: 0,
  //     estado_postulante_id: null,
  //     persona_id: persona.id,

  //   }

  //   postulante = post;
  // } else {

  postulante = JSON.parse(JSON.stringify(post))
  // }

  return {
    props: {

      postulante,
    }
  }
}

export default PostulantPage;
