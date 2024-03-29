import { Box, Button, Card, CardActions, CardMedia, FormControl, FormHelperText, FormLabel, Grid, InputLabel, LinearProgress, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { IGrado, IJob } from '@/interfaces';

import { reclutApi } from '@/apies';
import { useState, ChangeEvent, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { ModalAlert } from '../modal/ModalAlert';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';
import RichTextEditor from './RichTextEditor';
import sharp from 'sharp';
import Compressor from 'compressorjs';





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
    slug: string;
    img: string;
};

const AnnouncementForm: NextPage<Props> = ({ grados, job }) => {

    if (job.vigencia) {
        job.vigencia = moment(job.vigencia).toDate().toISOString().substring(0, 10)
    } else {

    }

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: job
    })
    const router = useRouter();
    const navigateTo = (url: string) => {
        router.push(url);
    }

    const tomorrow = dayjs().add(1, 'day');
    let vig;
    if (job.vigencia) {
        vig = dayjs(job.vigencia)
    } else {
        vig = null
    }

    const [fecha, setFecha] = useState<Dayjs | null>(vig);

    const fileInputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === 'titulo') {
                const newSlug = value.titulo?.trim()

                    .replaceAll("'", '')
                    .normalize('NFD')
                    .replaceAll(/[\u0300-\u036f]/g, '')
                    .replaceAll(/[^a-zA-Z0-9]/g, '-')
                    .replaceAll(/ñ/g, 'n')


                    .toLocaleLowerCase() || '';

                setValue('slug', newSlug);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue])
    const onRegisterForm = async (form: FormData) => {
        if (!fecha) {
            Swal.fire({
                title: 'Atención ',
                text: 'Ingrese la fecha de vigencia',
                icon: 'info',

                confirmButtonText: 'Aceptar',

            })
            return;
        }
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
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {

        if (!target.files || target.files.length === 0) {
            return;
        }


        toast.info('Cargando imagen')
        setLoadImg(true)



        try {


            const { data } = await reclutApi.post<{ message: string, url: string }>('/admin/awsupload', {
                name: target.files[0].name,
                type: target.files[0].type,
            });

            // console.log(webpBuffer)
            const url = data.url;
            const res = await reclutApi.put(url, target.files[0], {
                headers: {
                    "Content-type": target.files[0].type,
                    "Access-Control-Allow-Origin": "*"
                }
            })



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
    const handleUpload = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        let file = target.files[0];
        // Split the filename to get the name and type

        setLoadImg(true)
        new Compressor(file, {
            quality: 0.2,
            async success(result) {
                try {
                    const formData = new FormData();
                    formData.append("file", result);
                    formData.append("name", file.name);
                    formData.append("type", file.type);
                    const { data } = await reclutApi.post("/postulants/load", formData);
                    console.log(data.message)
                    toast.success("Imagen Subida Corretamente");
                    setLoadImg(false)
                    setValue('img', data.message, { shouldValidate: true });
                } catch (error) {
                    setLoadImg(false)
                    console.log(error)
                    notificacion('error al subir imagen')
                    toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
                }
                // reclutApi.post("/postulants/load", {
                //     fileName: result.name,
                //     fileType: result.type,
                // })
                //     .then((res) => {
                //         const signedRequest = res.data.signedRequest;
                //         const url = res.data.message;

                //         setUploadState({
                //             ...uploadState,
                //             url,
                //         });

                //         // Perform the actual upload using the signed URL
                //         // const options = {
                //         //     headers: {
                //         //         "Content-type": fileType,
                //         //         "Access-Control-Allow-Origin": "*"
                //         //     }
                //         // };
                //         reclutApi.put(signedRequest, result, {
                //             headers: {
                //                 "Content-type": fileType,
                //                 "Access-Control-Allow-Origin": "*"
                //             }
                //         })
                //             .then((_) => {
                //                 setUploadState({ ...uploadState, success: true });
                //                 toast.success("Imagen Subida Corretamente");
                //                 setLoadImg(false)
                //                 setValue('image', res.data.name, { shouldValidate: true });

                //             })
                //             .catch((_) => {
                //                 setLoadImg(false)
                //                 notificacion('error al subir foto de perfil')
                //                 toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
                //             });
                //     })
                //     .catch((error) => {
                //         notificacion('error al subir foto')
                //         toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
                //         setLoadImg(false)
                //     });
            }
        });
        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.

        // Post the file information to the server to obtain a signed URL const { data } = await

    };
    const [uploadState, setUploadState] = useState({});
    const notificacion = async (error: string) => {
        try {
            const { data } = await reclutApi.post('/noti', { error });

            return {
                hasError: false
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }


        }
    }

    const onChangeFecha = (dat: any) => {
        setFecha(dat)

        setValue('vigencia', dat.toISOString(), { shouldValidate: true });
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

    const [content, setContent] = useState(job.descripcion);

    const handleEditorChange = (value: string) => {
        setContent(value);
        setValue(
            'descripcion',
            value, { shouldValidate: true }
        );
    };
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
                            <InputLabel id="gradoId">Descripción</InputLabel>
                            <RichTextEditor value={content} onChange={handleEditorChange} />
                            {/* <TextField
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
                            /> */}

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
                                value={fecha}
                                onChange={(newValue) => onChangeFecha(newValue)}

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
                        <Grid item xs={12} md={12}>
                            <FormLabel sx={{ mb: 1 }}>Slug - URL</FormLabel>
                            <TextField


                                fullWidth
                                sx={{ mb: 1 }}
                                {...register('slug', {
                                    required: 'Este campo es requerido',
                                    validate: (val) => val.trim().includes(' ') ? 'No puede tener espacios en blanco' : undefined
                                })}
                                error={!!errors.slug}
                                helperText={errors.slug?.message}
                            />
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
                                                image={`${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${getValues('img')}`}
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
                                    onChange={handleUpload}
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