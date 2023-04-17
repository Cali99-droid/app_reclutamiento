import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { IEstado, IGrado, IJob } from '@/interfaces';

import { reclutApi } from '@/api';
import { useState } from 'react';
// import prisma from '@/lib/prisma';
import Modal from '../modal/Modal';
import { ModalAlert } from '../modal/ModalAlert';
import { jobs } from '../../database/seed';
import { convocatoria } from '@prisma/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface Props{
    grados:IGrado[]
    job: convocatoria
    }

type FormData = {
    id             :number
    titulo       : string;
    descripcion  : string;
    experiencia   : number;
    vacantes     : number;
    sueldoOfertado : number;
    gradoId : number;
    estadoId: number;
};


 const AnnouncementForm: NextPage<Props> = ({grados,job}) => {


    const { register, handleSubmit, formState:{ errors }} = useForm<FormData>({
        defaultValues: job
    })
    const router = useRouter();
    const navigateTo = ( url: string ) => {
    router.push(url);
    }

    const [open, setOpen] = useState(false)



  const handleClose = () => {
        setOpen(false);
  };

  const handleConfirm = () => {
    navigateTo('/admin/convocatorias')
  };

   const onRegisterForm = async( form: FormData  )=>{
   
   

    try {
        const { data } = await reclutApi({
            url: '/admin/convocatorias',
            method: form.id > 0 ? 'PUT': 'POST',  // si tenemos un _id, entonces actualizar, si no crear
            data: form
        });   
        setOpen(true);


    } catch (error) {
        console.log(error);
       
    }
   }

  return (
    <>
    <form onSubmit={ handleSubmit(onRegisterForm)} noValidate> 
        <Grid container spacing={4} marginTop={'.1rem'} justifyContent={'end'}>
        
            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Título"
                                    variant="outlined"
                                    fullWidth  
                                    required  
                                     
                                  { ...register('titulo', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 8 caracteres' }
                                })}
                                error={ !!errors.titulo }
                                helperText={ errors.titulo?.message }
                                />
                                <FormHelperText>Ejem: Docente primaria, Docente Secundaria, etc</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
                            <TextField
                                    id="outlined-multiline-flexible"
                                    label="Descripcion"
                                    multiline
                                    fullWidth
                                    required   
                                    { ...register('descripcion', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 2, message: 'Mínimo 8 caracteres' }
                                    })}
                                    error={ !!errors.descripcion }
                                    helperText={ errors.descripcion?.message }
                            />
                                 <FormHelperText>Ejem: Docente de matemática con 2 años de experiencia...</FormHelperText> 
            </Grid>
          
            <Grid item xs={12} md={3}>
            <TextField
                                    label="Experiencia"
                                    variant="outlined"
                                    type="number"
                                    fullWidth    
                                    defaultValue={1} 
                                    required
                                    { ...register('experiencia', {
                                        required: 'Este campo es requerido',
                                       
                                    })}
                                    error={ !!errors.experiencia }
                                    helperText={ errors.experiencia?.message }
                                />
                       <FormHelperText>Indique la experiencia minima solicitada en años</FormHelperText>
            </Grid>
            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Numero de vacantes"
                                    variant="outlined"
                                    type="number"
                                    fullWidth    
                                    defaultValue={1} 
                                    required
                              
                                    { ...register('vacantes', {
                                        required: 'Este campo es requerido',
                                 
                                    })}
                                    error={ !!errors.vacantes }
                                    helperText={ errors.vacantes?.message }
                                />
            </Grid>
            <Grid item xs={12} md={6}>
                             <TextField
                                    label="Sueldo ofertado"
                                    variant="outlined"
                                    type="number"
                                    fullWidth    
                                    defaultValue={2000} 
                                    required
                              
                                    { ...register('sueldoOfertado', {
                                        required: 'Este campo es requerido',
                                 
                                    })}
                                    error={ !!errors.sueldoOfertado }
                                    helperText={ errors.sueldoOfertado?.message }
                                />
            </Grid>

            <Grid item xs={12} md={6} >
                     
            </Grid>


        </Grid>
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

        <ModalAlert title={'¡ Creado Correctamente !'} open={open} handleClose={ handleClose} handleConfirm={ handleConfirm}>
            <Typography >La Convocatoria se guardó correctamente y esta publicada</Typography>

        </ModalAlert>
    
    
    
    </>
  )
}



export default AnnouncementForm

