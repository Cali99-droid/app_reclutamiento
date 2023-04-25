import { prisma } from '@/server/db/client';
import moment from 'moment';
import { useRouter } from "next/router";
import { JobsLayout } from "@/components/layouts";

import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { GetServerSideProps, NextPage } from "next";
import { IGrado, IPersona, IPostulant, IUser } from "@/interfaces";
import { getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { validations } from '@/helpers';
import { apiCon, reclutApi } from '@/api';

import { postulante } from '@prisma/client';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import Modal from '@/components/modal/Modal';
import axios from 'axios';
import { ErrorOutline } from '@mui/icons-material';

interface Props {
  user: IUser,
  grados: IGrado[]
  persona: IPersona;
  postulante: postulante
}

type FormData = {
  idPersona: number
  idPostulante: number
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  email: string;
  telefono: string;
  direccion: string;
  nacimiento: string;
  tipoId: number;
  numeroDocumento: string;
  experiencia: number;
  sueldoPretendido: number;
  especialidad: string;
  gradoId: number;
};




const PostulantPage: NextPage<Props> = ({ persona, grados, postulante }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({

    defaultValues: {
      idPersona: persona.id,
      idPostulante: postulante.id,
      nombre: persona.nombres,
      apellidoPat: persona.apellido_pat,
      apellidoMat: persona.apellido_mat,
      email: persona.user[0].email,
      telefono: postulante.telefono === null ? '' : postulante.telefono,
      direccion: postulante.direccion,
      nacimiento: moment(postulante.nacimiento).toDate().toISOString().substring(0, 10),
      tipoId: postulante.tipoId,
      numeroDocumento: postulante.numeroDocumento,
      experiencia: postulante.experiencia,
      sueldoPretendido: postulante.sueldo,
      especialidad: postulante.especialidad,
      gradoId: postulante.gradoId,
    }
  })
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  }

  const [isSaving, setIsSaving] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async (form: FormData) => {

    setIsSaving(true);
    try {
      const { data } = await reclutApi({
        url: '/postulants',
        method: form.idPostulante > 0 ? 'PUT' : 'POST',  // si tenemos un _id, entonces actualizar, si no crear
        data: form
      });


      if (!(form.idPostulante > 0)) {
        router.replace(`/postulant`);

      } else {
        setIsSaving(false)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setShowError(true);
        setErrorMessage(error.response?.data.message!);
        setTimeout(() => setShowError(false), 3000);
        setIsSaving(false)
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
      console.log(error);

    }

    toast.success("Datos actualizados correctamente!");


  }




  return (
    <JobsLayout title={"AE | Postulante "} pageDescription={"Postular a un empleo"}>
      <ToastContainer />
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        {/* <input type="hidden" { ...register('idPersona')} />
        <input type="hidden" { ...register('idPostulante')} /> */}

        <Box mt={15} mb={5}>
          <Typography variant='h1' component='h1'>Mis datos</Typography>
        </Box>


        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Datos personales</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Grid container spacing={4} >
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Nombres"
                    variant="outlined"
                    fullWidth
                    // onInput={handleChage}
                    {...register('nombre', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                    })}
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Apellido Paterno"
                    variant="outlined"
                    fullWidth

                    {...register('apellidoPat', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                    })}
                    error={!!errors.apellidoPat}
                    helperText={errors.apellidoPat?.message}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Apellido Materno"
                    variant="outlined"
                    fullWidth
                    {...register('apellidoMat', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                    })}
                    error={!!errors.apellidoPat}
                    helperText={errors.apellidoPat?.message}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    type="email"
                    label="Correo"
                    variant="outlined"
                    fullWidth
                    required
                    disabled
                    {...register('email', {
                      required: 'Este campo es requerido',
                      validate: validations.isEmail
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Telefono"
                    type="number"
                    variant="outlined"
                    fullWidth
                    {...register('telefono', {
                      required: 'Este campo es requerido',
                      minLength: { value: 9, message: 'Mínimo 9 caracteres' },
                      maxLength: { value: 9, message: 'Mínimo 9 caracteres' }
                    })}
                    error={!!errors.telefono}
                    helperText={errors.telefono?.message}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Dirección"
                    variant="outlined"
                    fullWidth
                    {...register('direccion', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                    })}
                    error={!!errors.direccion}
                    helperText={errors.direccion?.message}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <label htmlFor="">Fecha de nacimiento</label>
                  <TextField
                    type="date"

                    variant="standard"
                    fullWidth

                    {...register('nacimiento', {
                      required: 'Este campo es requerido',

                    })}
                    error={!!errors.nacimiento}
                    helperText={errors.nacimiento?.message}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth >
                    <InputLabel id="tipoId">Tipo </InputLabel>
                    <Select
                      labelId="tipoId"
                      id="tipoId"
                      label="tipo"
                      required
                      defaultValue={postulante.tipoId || 0}
                      {...register('tipoId', {
                        required: 'Este campo es requerido',

                      })}
                      error={!!errors.tipoId}
                    >
                      <MenuItem value={''}></MenuItem>
                      <MenuItem value={1}>DNI</MenuItem>
                      <MenuItem value={2}>Carnet</MenuItem>
                    </Select>
                    <FormHelperText>Tipo de documento: DNI, Carné, etc</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Chip
                    label={errorMessage}
                    color="error"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                    sx={{ display: showError ? 'flex' : 'none', mb: 4 }}

                  />
                  <TextField
                    label="Numero de documento"
                    type="number"
                    variant="outlined"
                    fullWidth
                    {...register('numeroDocumento', {
                      required: 'Este campo es requerido',
                      minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                      maxLength: { value: 8, message: 'Mínimo 8 caracteres' }
                    })}
                    error={!!errors.numeroDocumento}
                    helperText={errors.numeroDocumento?.message}
                  />
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Datos profesionales</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box >

              <Grid container spacing={4}  >

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Experiencia"
                    type="number"
                    variant="outlined"
                    fullWidth
                    {...register('experiencia', {
                      required: 'Este campo es requerido',

                    })}
                    error={!!errors.experiencia}
                    helperText={errors.experiencia?.message}
                  />
                  <FormHelperText>Especificar años de experiencia</FormHelperText>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Especialidad Principal"
                    variant="outlined"
                    fullWidth
                    {...register('especialidad', {
                      required: 'Este campo es requerido',

                    })}
                    error={!!errors.especialidad}
                    helperText={errors.especialidad?.message}
                  />
                  <FormHelperText>Especificar su especialidad para este puesto</FormHelperText>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Sueldo Pretendido"
                    type="number"
                    variant="outlined"
                    fullWidth
                    {...register('sueldoPretendido', {
                      required: 'Este campo es requerido',

                    })}
                    error={!!errors.sueldoPretendido}
                    helperText={errors.sueldoPretendido?.message}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth >
                    <InputLabel id="gradoId">Grado</InputLabel>
                    <Select
                      labelId="gradoId"
                      id="gradoId"
                      label="Requisito"
                      defaultValue={postulante.gradoId || ''}
                      {...register('gradoId', {
                        required: 'Este campo es requerido',

                      })}
                      error={!!errors.gradoId}

                    >
                      <MenuItem value={''}></MenuItem>


                      {
                        grados.map(grado => (
                          <MenuItem key={grado.id} value={grado.id}>{grado.nombre.toLocaleUpperCase()}</MenuItem>
                        ))
                      }




                    </Select>
                    <FormHelperText>Grado mínimo para postular</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Box width={'50%'} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 5 }}>
            <Button
              size="large"
              sx={{ marginTop: 3, textAlign: 'end', bgcolor: '#9E002B', }}
              startIcon={<ArrowBackIcon />}
              onClick={() => { history.go(-1); return false; }}
            >Volver
            </Button>
            <Button disabled={isSaving} type='submit' size="large" sx={{ marginTop: 3, textAlign: 'end' }} startIcon={<SaveIcon />}>Guardar</Button>
          </Box>
        </Box>

      </form>

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
