import { prisma } from '@/server/db/client';
import { JobsLayout } from "@/components/layouts";

import { Box, Button, Step, StepLabel, Stepper, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import { GetServerSideProps, NextPage } from "next";
import { IGrado, IPersona, IPostulant, IUser } from "@/interfaces";
import { getSession, useSession } from 'next-auth/react';

import { apiCon, reclutApi } from '@/api';

import { postulante } from '@prisma/client';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext, useEffect } from 'react';

import { FormDatos } from '../../components/postulants/FormDatos';
import Form from '@/components/pasos/Form';
import { AuthContext, DatosContext } from '@/context';


interface Props {

  grados: IGrado[]
  persona: IPersona;
  postulante: postulante
}


const PostulantPage: NextPage<Props> = ({ persona, grados, postulante }) => {
  const { activeStep, handleBack, handleNext, steps, setPos, pos } = useContext(DatosContext)

  return (
    <JobsLayout title={"AE | Postulante "} pageDescription={"Postular a un empleo"}>
      <ToastContainer />

      <Box mb={2} mt={15} padding={8}>
        <Typography variant='h1' component='h1'>Mis datos</Typography>
        <Form />
        {
          activeStep === 0 && (
            <FormDatos grados={grados} persona={persona} postulante={postulante} />
          )
        }

      </Box>

      {/* <FormDatos grados={grados} persona={persona} postulante={postulante} /> */}


    </JobsLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  let postulante
  const session: any = await getSession({ req });
  const grados = await apiCon('/grados')


  const { user } = session;

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

  const persona = JSON.parse(JSON.stringify(person))
  if (person?.postulante[0] === undefined) {
    const post = {
      postulanteId: 0,
      id: 0,
      telefono: '9',
      direccion: '',
      nacimiento: '1999-02-14',
      tipoId: null,
      numeroDocumento: '',
      experiencia: null,
      sueldo: null,
      especialidad: null,
      gradoId: 0,
      estado_postulante_id: null,
      persona_id: persona.id,

    }

    postulante = post;
  } else {


    postulante = JSON.parse(JSON.stringify(person.postulante[0]))
  }



  // const convocatorias = await apiCon('/admin/convocatorias')

  return {
    props: {
      persona,
      postulante,
      grados,

    }
  }
}

export default PostulantPage;
