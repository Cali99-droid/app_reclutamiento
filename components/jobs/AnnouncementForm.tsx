import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { IGrado, IJob } from '@/interfaces';

import { reclutApi } from '@/api';
import { useState } from 'react';

import { ModalAlert } from '../modal/ModalAlert';

import { convocatoria } from '@prisma/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';


interface Props {
    grados: IGrado[]
    job: IJob
}

type FormData = {
    id: number
    titulo: string;
    descripcion: string;
    vigencia: Date | string | null;
    experiencia: number;
    vacantes: number;
    sueldoOfertado: number;
    gradoId: number;
    estadoId: number;
    categoria_id: number | null;
};


const AnnouncementForm: NextPage<Props> = ({ grados, job }) => {

    if (job.vigencia) {
        job.vigencia = moment(job.vigencia).toDate().toISOString().substring(0, 10)
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: job
    })
    const router = useRouter();
    const navigateTo = (url: string) => {
        router.push(url);
    }

    const [open, setOpen] = useState(false)



    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        navigateTo('/admin/convocatorias')
    };

    const onRegisterForm = async (form: FormData) => {
        try {
            const { data } = await reclutApi({
                url: '/admin/convocatorias',
                method: form.id > 0 ? 'PUT' : 'POST',  // si tenemos un _id, entonces actualizar, si no crear
                data: form
            });
            setOpen(true);


        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <Paper sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden', padding: 3 }}>
                <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                    <Grid container spacing={4} marginTop={'.1rem'} justifyContent={'end'}>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Título"
                                variant="outlined"
                                fullWidth
                                required

                                {...register('titulo', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 8, message: 'Mínimo 8 caracteres' }
                                })}
                                error={!!errors.titulo}
                                helperText={errors.titulo?.message}
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
                                    defaultValue={job.gradoId > 0 ? job.gradoId : ''}
                                    {...register('gradoId', {
                                        required: 'Este campo es requerido',

                                    })}
                                    error={!!errors.gradoId}


                                >


                                    {
                                        grados.map(grado => (
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
                                rows={4}
                                required
                                fullWidth={true}
                                {...register('descripcion', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 8, message: 'Mínimo 8 caracteres' }
                                })}
                                error={!!errors.descripcion}
                                helperText={errors.descripcion?.message}
                            />

                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Experiencia"
                                variant="outlined"
                                type="number"
                                fullWidth
                                defaultValue={1}
                                required
                                {...register('experiencia', {
                                    required: 'Este campo es requerido',
                                    maxLength: { value: 2, message: 'Máximo 2 caracteres' }
                                })}
                                error={!!errors.experiencia}
                                helperText={errors.experiencia?.message}
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

                                {...register('vacantes', {
                                    required: 'Este campo es requerido',

                                })}
                                error={!!errors.vacantes}
                                helperText={errors.vacantes?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Sueldo ofertado"
                                variant="outlined"
                                type="number"
                                fullWidth
                                defaultValue={2000}
                                required

                                {...register('sueldoOfertado', {
                                    required: 'Este campo es requerido',
                                    maxLength: { value: 4, message: 'Máximo 4 caracteres' }
                                })}
                                error={!!errors.sueldoOfertado}
                                helperText={errors.sueldoOfertado?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <label htmlFor="vigencia" >Vigencia</label>
                            <TextField
                                id='vigencia'
                                variant="standard"
                                type="date"
                                fullWidth

                                required

                                {...register('vigencia', {
                                    required: 'Este campo es requerido',

                                })}
                                error={!!errors.vigencia}
                                helperText={errors.vigencia?.message}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth >
                                <InputLabel id="categoria_id">Categoría</InputLabel>
                                <Select
                                    labelId="categoria_id" //
                                    id="categoria_id"
                                    label="Requisito"
                                    defaultValue={job.categoria_id === null ? 'choose' : job.categoria_id}
                                    {...register('categoria_id', {
                                        required: 'Este campo es requerido',

                                    })}
                                    error={!!errors.categoria_id}


                                >
                                    <MenuItem value={'choose'} disabled>-- Seleccione --</MenuItem>

                                    <MenuItem value={1}>ADMINISTRATIVO</MenuItem>
                                    <MenuItem value={2}>DOCENTE</MenuItem>





                                </Select>

                            </FormControl>
                        </Grid>


                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Box width={'50%'} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 5 }}>
                            <Button
                                size="large"
                                sx={{ marginTop: 3, textAlign: 'end', }}
                                startIcon={<ArrowBackIcon />}
                                onClick={() => navigateTo('/admin/convocatorias/')}
                            >Volver
                            </Button>
                            <Button type='submit' size="large" sx={{ marginTop: 3, textAlign: 'end' }} startIcon={<SaveIcon />}>Guardar</Button>
                        </Box>
                    </Box>

                </form>
            </Paper>


            <ModalAlert title={'¡ Guardado Correctamente !'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
                <Typography >La Convocatoria se guardó correctamente y esta publicada</Typography>

            </ModalAlert>



        </>
    )
}



export default AnnouncementForm

