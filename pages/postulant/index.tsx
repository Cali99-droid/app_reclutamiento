import { prisma } from '@/server/db/client';

import { useRouter } from "next/router";
import { JobsLayout } from "@/components/layouts";

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { GetServerSideProps,  NextPage } from "next";
import { IGrado, IUser } from "@/interfaces";
import { getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { validations } from '@/helpers';
import { apiCon, reclutApi } from '@/api';


interface Props{
  user:IUser,
  grados:IGrado[]
}

type FormData = {
  id            :number
  nombre       : string;
  apellidoPat   : string;
  apellidoMat   : string;
  email         : string;
  telefono      : string;
  direccion     : string;
  nacimiento    : Date;
  tipoId        : number;
  numeroDocumento   : string;
  experiencia     : number;
  sueldoPretendido: number;
  especialidad: string;
  gradoId : number;
};




const PostulantPage: NextPage<Props>= ({user,grados})=> {
  console.log(user)
  const { register, handleSubmit, formState:{ errors }} = useForm<FormData>({
    defaultValues: {
      id            :user.id,
      nombre       : user.persona.nombres,
      apellidoPat   : user.persona.apellido_pat,
      apellidoMat   : user.persona.apellido_mat,
      email         : user.email,
      telefono      : '9',
      direccion     : '',
      nacimiento    :  undefined,
      tipoId        : 1,
      numeroDocumento   : '',
      experiencia     : 2,
      sueldoPretendido: 2000,
      especialidad: 'Ingenieria',
      gradoId : 1,
    }
})
  const router = useRouter();
  const navigateTo = ( url: string ) => {
    router.push(url);
    }


    const onRegisterForm = async( form: FormData  )=>{
      try {
        const { data } = await reclutApi({
            url: '/postulants/',
            method: 'POST',  // si tenemos un _id, entonces actualizar, si no crear
            data: form
        });   
 
    console.log(data)

    } catch (error) {
        console.log(error);
       
    }
      
    
    }
  return (
    <JobsLayout title={"AE | Postulante "} pageDescription={"Postular a un empleo"}>
      <form onSubmit={ handleSubmit(onRegisterForm)} noValidate>
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
                                            { ...register('nombre', {
                                              required: 'Este campo es requerido',
                                              minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                          })}
                                          error={ !!errors.nombre }
                                          helperText={ errors.nombre?.message }   
                                        />            
                  </Grid>
                  <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Apellido Paterno"
                                            variant="outlined"
                                            fullWidth  
                                           
                                            { ...register('apellidoPat', {
                                              required: 'Este campo es requerido',
                                              minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                          })}
                                          error={ !!errors.apellidoPat }
                                          helperText={ errors.apellidoPat?.message }    
                                        />            
                  </Grid>
                  <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Apellido Materno"
                                            variant="outlined"
                                            fullWidth  
                                            { ...register('apellidoPat', {
                                              required: 'Este campo es requerido',
                                              minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                          })}
                                          error={ !!errors.apellidoPat }
                                          helperText={ errors.apellidoPat?.message }   
                                        />            
                  </Grid>
                  <Grid item xs={12} md={4}>
                                        <TextField
                                            type="email"
                                            label="Correo"
                                            variant="outlined"
                                            fullWidth  
                                            required   
                                          
                                            { ...register('email', {
                                              required: 'Este campo es requerido',
                                              validate: validations.isEmail
                                          })}
                                          error={ !!errors.email }
                                          helperText={ errors.email?.message } 
                                        />            
                  </Grid>
                  <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Telefono"
                                            type="number"
                                            variant="outlined"
                                            fullWidth  
                                            { ...register('telefono', {
                                              required: 'Este campo es requerido',
                                              minLength: { value: 9, message: 'Mínimo 9 caracteres' },
                                              maxLength: { value: 9, message: 'Mínimo 9 caracteres' }
                                          })}
                                          error={ !!errors.telefono }
                                          helperText={ errors.telefono?.message }     
                                        />            
                  </Grid>
                  <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Dirección"
                                            variant="outlined"
                                            fullWidth  
                                            { ...register('direccion', {
                                              required: 'Este campo es requerido',
                                              minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                          })}
                                          error={ !!errors.direccion }
                                          helperText={ errors.direccion?.message }      
                                        />            
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label htmlFor="">Fecha de nacimiento</label>
                                        <TextField
                                            type="date"
                                          
                                            variant="standard"
                                            fullWidth
                                            { ...register('nacimiento', {
                                              required: 'Este campo es requerido',
                                             
                                          })}
                                          error={ !!errors.nacimiento }
                                          helperText={ errors.nacimiento?.message }    
                                        />            
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <FormControl fullWidth >
                                  <InputLabel id="tipoId">Tipo de Documento</InputLabel>
                                  <Select
                                  labelId="tipoId"
                                  id="tipoId"
                                  label="tipo"
                                  required
                                    { ...register('tipoId', {
                                        required: 'Este campo es requerido',
                                       
                                    })}
                                    error={ !!errors.tipoId }
                                  >
                                      <MenuItem  value={''}></MenuItem>  
                                      <MenuItem  value={1}>DNI</MenuItem>  
                                      <MenuItem  value={2}>Cartne</MenuItem>  
                                  </Select>
                                  <FormHelperText>DNI, Carné, etc</FormHelperText>
                        </FormControl>       
                  </Grid>
                  <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Numero de documento"
                                            type="number"
                                            variant="outlined"
                                            fullWidth  
                                            { ...register('numeroDocumento', {
                                              required: 'Este campo es requerido',
                                              minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                                              maxLength: { value: 8, message: 'Mínimo 8 caracteres' }
                                          })}
                                          error={ !!errors.numeroDocumento }
                                          helperText={ errors.numeroDocumento?.message }     
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
                                                { ...register('experiencia', {
                                                  required: 'Este campo es requerido',
                                                 
                                              })}
                                              error={ !!errors.experiencia }
                                              helperText={ errors.experiencia?.message }      
                                            />        
                                            <FormHelperText>Especificar años de experiencia</FormHelperText>    
                      </Grid>
                      <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Especialidad Principal"
                                                variant="outlined"
                                                fullWidth  
                                                { ...register('especialidad', {
                                                  required: 'Este campo es requerido',
                                                 
                                              })}
                                              error={ !!errors.especialidad }
                                              helperText={ errors.especialidad?.message }     
                                            />     
                                            <FormHelperText>Especificar su especialidad para este puesto</FormHelperText>         
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Sueldo Pretendido"
                                                type="number"
                                                variant="outlined"
                                                fullWidth  
                                                { ...register('sueldoPretendido', {
                                                  required: 'Este campo es requerido',
                                                 
                                              })}
                                              error={ !!errors.sueldoPretendido }
                                              helperText={ errors.sueldoPretendido?.message }       
                                            />            
                      </Grid>
                      <Grid item xs={12} md={4}>
                            <FormControl fullWidth >
                                            <InputLabel id="gradoId">Grado</InputLabel>
                                            <Select
                                            labelId="gradoId"
                                            id="gradoId"
                                            label="Requisito"
                                            required
                                            { ...register('gradoId', {
                                                required: 'Este campo es requerido',
                                               
                                            })}
                                            error={ !!errors.gradoId }
                                            
                                            >
                                                <MenuItem  value={''}></MenuItem>
                                                
                           
                                            {
                                                grados.map(grado=>(
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

        <Box sx={{display:'flex',  justifyContent:'flex-end', mt:2}}>
                <Box width={'50%'} sx={{display:'flex',  justifyContent:'flex-end',gap:5}}>
                    <Button 
                    size="large" 
                    sx={{marginTop:3,  textAlign:'end',bgcolor:'#9E002B',}}
                    startIcon={<ArrowBackIcon/>}
                    onClick={ () => navigateTo('/admin/convocatorias/')}
                    >Volver
                    </Button> 
                    <Button type='submit'  size="large" sx={{marginTop:3,  textAlign:'end'}}startIcon={<SaveIcon/>}>Guardar</Button>
                </Box>
        </Box>

      </form>
       
    </JobsLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const session: any = await getSession({req});
  const grados = await apiCon('/grados')


  const {user} = session;

  // const convocatorias = await apiCon('/admin/convocatorias')
  


   return {
       props: {
        user,
        grados,
         
       }
   }
}

export default PostulantPage;
