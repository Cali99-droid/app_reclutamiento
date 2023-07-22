import { Box, Button, Card, CardActions, CardMedia, FormControl, FormHelperText, FormLabel, Grid, InputLabel, LinearProgress, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { IGrado, IJob } from '@/interfaces';

import { reclutApi } from '@/apies';
import { useState, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { ModalAlert } from '../modal/ModalAlert';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';

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
    img: string;
};

const AnnouncementForm: NextPage<Props> = ({ grados, job }) => {

    if (job.vigencia) {
        job.vigencia = moment(job.vigencia).toDate().toISOString().substring(0, 10)
    }

    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<FormData>({
        defaultValues: job
    })
    const router = useRouter();
    const navigateTo = (url: string) => {
        router.push(url);
    }
    const tomorrow = dayjs().add(1, 'day');
    const vig = job.vigencia || tomorrow;
    const [fecha, setFecha] = useState<Dayjs>(dayjs(vig));

    const fileInputRef = useRef<HTMLInputElement>(null)


    const onRegisterForm = async (form: FormData) => {



        try {
            const { data } = await reclutApi({
                url: '/admin/convocatorias',
                method: form.id > 0 ? 'PUT' : 'POST',  // si tenemos un _id, entonces actualizar, si no crear
                data: form
            });
            Swal.fire({
                title: 'Guardado con éxito ',
                text: 'La convocatoria se guardo correctamente y esta publicada',
                icon: 'success',

                confirmButtonText: 'Aceptar',

            }).then((result) => {

                navigateTo('/admin/convocatorias');
            });



        } catch (error) {
            if (axios.isAxiosError(error)) {
                // setShowError(true);
                // setErrorMessage(error.response?.data.message!);
                // setTimeout(() => setShowError(false), 3000);
                // setIsSaving(false)
                toast.error(error.response?.data.message);
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            console.log(error);

        }
    }
    const [loadImg, setLoadImg] = useState(false)
    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        toast.info('Cargando imagen')
        setLoadImg(true)

        try {


            const { data } = await reclutApi.post<{ message: string, url: string }>('/admin/awsupload', {
                name: target.files[0].name,
                type: target.files[0].type
            });

            const url = data.url;
            const res = await reclutApi.put(url, target.files[0], {
                headers: {
                    "Content-type": target.files[0].type,
                    "Access-Control-Allow-Origin": "*"
                }
            })


            const urlimg = 'https://plataforma-virtual.s3.us-west-2.amazonaws.com/' + data.message;

            setValue('img', data.message, { shouldValidate: true });




        } catch (error) {
            console.log({ error });
        }

        // try {

        //     // console.log( file );
        //     for (const file of target.files) {
        //         const formData = new FormData();
        //         formData.append('file', file);
        //         const { data } = await reclutApi.post<{ message: string }>('/postulants/upload', formData);
        //         setValue('img', data.message, { shouldValidate: true });

        //     }


        // } catch (error) {
        //     console.log({ error });
        // }
    }
    const onChangeFecha = (dat: dayjs.Dayjs) => {
        setFecha(dat)
        setValue('vigencia', dat.toISOString());
        // console.log(getValues('vigencia'))
    }
    const onDeleteImage = () => {
        // console.log(getValues('image'))
        setValue(
            'img',
            '', { shouldValidate: true }
        );
        // console.log(getValues('image'))

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

                            <DatePicker

                                disablePast
                                views={['month', 'day']}
                                label={'Vigencia'}
                                defaultValue={fecha}
                                onChange={(newValue) => onChangeFecha(newValue!)}
                            />
                            {/* <label htmlFor="vigencia" >Vigencia</label>

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
                            /> */}
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
                        <Grid item xs={12} md={4}>
                            <Typography sx={{ display: loadImg ? 'block' : 'none' }} >Cargando...</Typography>
                            <LinearProgress sx={{ display: loadImg ? 'block' : 'none' }} />
                            {
                                getValues('img') && (
                                    <Box width={150} margin={'auto'}>


                                        <Card>
                                            <CardMedia
                                                component='img'
                                                className='fadeIn'
                                                image={`https://caebucket.s3.us-west-2.amazonaws.com/img/${getValues('img')}`}
                                                alt={getValues('img')}
                                                onLoad={() => setLoadImg(false)}
                                            />
                                            <CardActions>
                                                <Button
                                                    fullWidth
                                                    color="error"
                                                    onClick={() => onDeleteImage()}
                                                >
                                                    Borrar
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Box>)

                            }


                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box>
                                <FormLabel >Imagen</FormLabel>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    variant='outlined'
                                    // startIcon={ <UploadOutlined /> }

                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Cargar imagen
                                </Button>
                                <FormHelperText>*Imagen de la convocatoria</FormHelperText>
                                <input
                                    ref={fileInputRef}
                                    type="file"

                                    accept='image/png, image/gif, image/jpeg'
                                    style={{ display: 'none' }}
                                    onChange={onFilesSelected}
                                />
                            </Box>
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


            {/* <ModalAlert title={'¡ Guardado Correctamente !'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
                <Typography >La Convocatoria se guardó correctamente y esta publicada</Typography>

            </ModalAlert> */}



        </>
    )
}



export default AnnouncementForm

