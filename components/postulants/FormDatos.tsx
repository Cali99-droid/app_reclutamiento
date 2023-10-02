import { reclutApi } from '@/apies';
import { validations } from '@/helpers';
import { IGrado, IPersona, IUser } from '@/interfaces';

import { Box, Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography, Divider, SelectChangeEvent, FormLabel, Card, CardMedia, CardActions, CircularProgress, LinearProgress, useMediaQuery } from '@mui/material';
import { dni_image, postulante } from '@prisma/client';
import axios from 'axios';
import moment from 'moment';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import EastIcon from '@mui/icons-material/East';
import { useContext, ChangeEvent } from 'react';
import { DatosContext } from '@/context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { UploadFileOutlined } from '@mui/icons-material';

import Compressor from 'compressorjs';
interface Props {



    postulante: any
}
type FormData = {
    image: string;
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
    estadoCivil: string;
    exalumno: number,
    egreso?: number,
    hijos: number,
    discapacidad: number,
    nivel: string,
    imgs: dni_image[]

};
const MAX_IMAGE_SIZE_MB = 2;

export const FormDatos: NextPage<Props> = ({ postulante }) => {
    const { dni_image } = postulante;

    const [isSaving, setIsSaving] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null)
    const dniInputRef = useRef<HTMLInputElement>(null)
    const [ex, setEx] = useState(true)

    const router = useRouter();
    const { handleNext } = useContext(DatosContext)


    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<FormData>({
        mode: 'all',
        defaultValues: {
            idPersona: postulante.persona.id,
            idPostulante: postulante.id,
            nombre: postulante.persona.nombres,
            apellidoPat: postulante.persona.apellido_pat,
            apellidoMat: postulante.persona.apellido_mat,
            email: postulante.persona.user[0].email,
            telefono: postulante.telefono === null ? '' : postulante.telefono,
            direccion: postulante.direccion,
            nacimiento: moment(postulante.nacimiento).toDate().toISOString().substring(0, 10),
            tipoId: postulante.tipoId,
            numeroDocumento: postulante.numeroDocumento,
            estadoCivil: postulante.estado_civil === null ? '' : postulante.estado_civil,
            exalumno: postulante.exalumno === null ? 0 : parseInt(postulante.exalumno.toString()),
            egreso: postulante.egreso === null ? 1990 : postulante.egreso,
            hijos: postulante.hijos === null ? 0 : postulante.hijos,
            sueldoPretendido: postulante.sueldo,
            discapacidad: postulante.discapacidad === null ? 0 : postulante.discapacidad,
            nivel: postulante.nivel === null ? '' : postulante.nivel,
            gradoId: postulante.gradoId,
            image: postulante.image === null ? '' : postulante.image,
            imgs: postulante.dni_image === null ? [] : postulante.dni_image,

        }
    })
    const [loadImg, setLoadImg] = useState(false)
    const [loadImgDni, setLoadImgDni] = useState(false)
    const onRegisterForm = async (form: FormData) => {
        setIsSaving(true);

        console.log(form)
        try {

            const { data } = await reclutApi({
                url: '/postulants',
                method: form.idPostulante > 0 ? 'PUT' : 'POST',  // si tenemos un _id, entonces actualizar, si no crear
                data: form
            });

            router.push(`/postulant`);
            // router.replace(router.asPath);
            // if (!(form.idPostulante > 0)) {


            // } else {
            //     setIsSaving(false)
            // }
            handleNext()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setShowError(true);
                setErrorMessage(error.response?.data.message!);
                setTimeout(() => setShowError(false), 3000);
                setIsSaving(false)
                toast.error(error.response?.data.message);
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            console.log(error);

        }




    }
    const [egreso, setEgreso] = useState('1980')
    const verificar = (e: SelectChangeEvent<number>) => {
        if (e.target.value === 1) {
            setEx(false)
            setEgreso('')
            return
        }
        setEx(true)
    }
    const [file, setFile] = useState<File | null>(null);
    const uploadInput = useRef(null);
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
    const handleUpload = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        let file = target.files[0];
        // Split the filename to get the name and type
        let fileParts = target.files[0].name.split(".");
        let fileName = file.name;
        let fileType = file.type;
        setLoadImg(true)
        new Compressor(file, {
            quality: 0.6,
            async success(result) {
                reclutApi.post("/postulants/load", {
                    fileName: result.name,
                    fileType: result.type,
                })
                    .then((res) => {
                        const signedRequest = res.data.signedRequest;
                        const url = res.data.url;

                        setUploadState({
                            ...uploadState,
                            url,
                        });

                        // Perform the actual upload using the signed URL
                        // const options = {
                        //     headers: {
                        //         "Content-type": fileType,
                        //         "Access-Control-Allow-Origin": "*"
                        //     }
                        // };
                        reclutApi.put(signedRequest, result, {
                            headers: {
                                "Content-type": fileType,
                                "Access-Control-Allow-Origin": "*"
                            }
                        })
                            .then((_) => {
                                setUploadState({ ...uploadState, success: true });
                                toast.success("Imagen Subida Corretamente");
                                setLoadImg(false)
                                setValue('image', res.data.name, { shouldValidate: true });

                            })
                            .catch((_) => {
                                setLoadImg(false)
                                notificacion('error al subir foto de perfil')
                                toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
                            });
                    })
                    .catch((error) => {
                        notificacion('error al subir foto')
                        toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
                        setLoadImg(false)
                    });
            }
        });
        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.

        // Post the file information to the server to obtain a signed URL const { data } = await

    };
    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        // const fileSizeInMB = target.files[0].size / (1024 * 1024);
        // if (fileSizeInMB >= MAX_IMAGE_SIZE_MB) {

        //     // Aquí puedes realizar la lógica para subir el archivo
        //     // por ejemplo, enviarlo a través de una API o almacenarlo en S3.
        //     console.log('Archivo inválido, tamaño:', fileSizeInMB, 'MB');
        //     toast.error('La imagen debe ser de menos de 2 mb');
        //     return;
        // }
        setLoadImg(true)

        try {

            new Compressor(target.files[0], {
                quality: 0.4,

                // The compression process is asynchronous,
                // which means you have to access the `result` in the `success` hook function.
                async success(result) {


                    // The third parameter is required for server


                    const { data } = await reclutApi.post<{ message: string, url: string }>('/postulants/awsupload', {
                        name: result.name,
                        type: result.type
                    });
                    const url = data.url;
                    const res = await reclutApi.put(url, result, {
                        headers: {
                            "Content-type": result.type,
                            "Access-Control-Allow-Origin": "*"
                        }
                    })
                    setValue('image', data.message, { shouldValidate: true });

                    console.log(data)

                    //   // Send the compressed image file to server with XMLHttpRequest.
                    //   axios.post('/path/to/upload', formData).then(() => {
                    //     console.log('Upload success');
                    //   });
                },
                error(err) {
                    console.log(err.message);
                },
            });

        } catch (error) {
            console.log({ error });
        }
        // try {

        //     // console.log( file );
        //     for (const file of target.files) {
        //         const formData = new FormData();
        //         formData.append('file', file);
        //         const { data } = await reclutApi.post<{ message: string }>('/postulants/upload', formData);
        //         setValue('image', data.message, { shouldValidate: true });
        //         console.log(data)
        //     }


        // } catch (error) {
        //     console.log({ error });
        // }
    }
    const [imgDni, setImgDni] = useState<any>([])

    const onFilesSelectedDni = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0 || target.files.length > 2) {
            toast.error('Son solo 2 imagenes')
            return;
        }
        setLoadImgDni(false)

        try {
            // setLoadImg(true)
            for (const file of target.files) {

                // const { data } = await reclutApi.post<{ message: string, url: string }>('/postulants/awsupload', {
                //     name: file.name,
                //     type: file.type,
                // });
                // const url = data.url;
                // const res = await reclutApi.put(url, file, {
                //     headers: {
                //         "Content-type": file.type,
                //         "Access-Control-Allow-Origin": "*"
                //     }
                // })
                // setImgDni([...imgDni, data.message])


                new Compressor(file, {
                    quality: 0.6,

                    // The compression process is asynchronous,
                    // which means you have to access the `result` in the `success` hook function.
                    async success(result) {


                        // The third parameter is required for server


                        reclutApi.post("/postulants/load", {
                            fileName: result.name,
                            fileType: result.type,
                        })
                            .then((res) => {
                                const signedRequest = res.data.signedRequest;
                                const url = res.data.url;

                                setUploadState({
                                    ...uploadState,
                                    url,
                                });

                                // Perform the actual upload using the signed URL
                                // const options = {
                                //     headers: {
                                //         "Content-type": fileType,
                                //         "Access-Control-Allow-Origin": "*"
                                //     }
                                // };
                                reclutApi.put(signedRequest, result, {
                                    headers: {
                                        "Content-type": result.type,
                                        "Access-Control-Allow-Origin": "*"
                                    }
                                })
                                    .then((_) => {
                                        setUploadState({ ...uploadState, success: true });
                                        toast.success("Imagen Subida Corretamente");
                                        setLoadImg(false)
                                        // setValue('image', res.data.url, { shouldValidate: true });
                                        setValue('imgs', [...getValues('imgs'), { id: 0, image: res.data.name, postulante_id: postulante.id }], { shouldValidate: true });

                                    })
                                    .catch((_) => {
                                        setLoadImg(false)
                                        notificacion('error al subir foto en dni')
                                        toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
                                    });
                            })
                            .catch((error) => {
                                notificacion('error al subir foto')
                                toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
                                setLoadImg(false)
                            });


                        //   // Send the compressed image file to server with XMLHttpRequest.
                        //   axios.post('/path/to/upload', formData).then(() => {
                        //     console.log('Upload success');
                        //   });
                    },
                    error(err) {
                        console.log(err.message);
                    },
                });
            }

        } catch (error) {
            console.log({ error });
            setLoadImgDni(false);
            toast.error('Hubo un error')
        }
        // try {

        //     // console.log( file );
        //     for (const file of target.files) {
        //         const formData = new FormData();
        //         formData.append('file', file);
        //         const { data } = await reclutApi.post<{ message: string }>('/postulants/upload', formData);
        //         setValue('image', data.message, { shouldValidate: true });
        //         console.log(data)
        //     }


        // } catch (error) {
        //     console.log({ error });
        // }
    }


    const onDeleteImage = () => {
        // console.log(getValues('image'))
        setValue(
            'image',
            '', { shouldValidate: true }
        );
        // console.log(getValues('image'))

    }
    const onDeleteImageDni = (image: string) => {
        setValue(
            'imgs',
            getValues('imgs').filter(img => img.image !== image),
            { shouldValidate: true }
        );
    }

    // const onDrop = useCallback(acceptedFiles => {
    //     // Do something with the files
    //   }, [])


    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Box className="fadeIn" mt={matches ? -10 : 0}>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate >
                <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }} >

                    <Button disabled={isSaving} type='submit' size="large" sx={{ marginTop: 2, textAlign: 'end' }} endIcon={<EastIcon />} >Continuar</Button>
                </Box>
                <Box padding={4} borderRadius={4} bgcolor={'#FFF'}>
                    <Grid container spacing={2} >

                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Nombres"
                                variant="outlined"
                                fullWidth
                                required
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
                                required
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
                                required
                                {...register('apellidoMat', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={!!errors.apellidoMat}
                                helperText={errors.apellidoMat?.message}
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
                                required
                                {...register('telefono', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 9, message: 'Mínimo 9 caracteres' },
                                    maxLength: { value: 9, message: 'Mínimo 9 caracteres' },
                                    validate: validations.isTelephone
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
                                required
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
                                required
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

                                    <MenuItem value={1}>DNI</MenuItem>
                                    <MenuItem value={2}>Carnet de Extranjeria</MenuItem>

                                </Select>
                                <FormHelperText>Tipo de documento</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* <Chip
                            label={errorMessage}
                            color="error"
                            icon={<ErrorOutline />}
                            className="fadeIn"
                            sx={{ display: showError ? 'flex' : 'none', mb: 4 }}

                        /> */}
                            <TextField
                                label="Numero de documento"
                                type="number"
                                variant="outlined"
                                fullWidth
                                required
                                {...register('numeroDocumento', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                                    maxLength: { value: 8, message: 'Mínimo 8 caracteres' },
                                    validate: validations.isNumber
                                })}
                                error={!!errors.numeroDocumento}
                                helperText={errors.numeroDocumento?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth >
                                <InputLabel id="tipoId">Estado Civil </InputLabel>
                                <Select
                                    variant='outlined'
                                    sx={{ mt: 1 }}
                                    labelId="estadoCivil"
                                    id="estadoCivil"
                                    label="estadoCivil"
                                    required
                                    defaultValue={postulante.estado_civil || ''}
                                    {...register('estadoCivil', {
                                        required: 'Este campo es requerido',

                                    })}
                                    error={!!errors.estadoCivil}
                                >
                                    <MenuItem value={'Soltero'}>Soltero</MenuItem>
                                    <MenuItem value={'Casado'}>Casado</MenuItem>
                                    <MenuItem value={'Viudo'}>Viudo</MenuItem>
                                    <MenuItem value={'Divorciado'}>Divorciado</MenuItem>

                                </Select>

                            </FormControl>
                        </Grid>



                        <Grid item xs={12} md={4}>

                            <TextField
                                label="Sueldo pretendido (S/)"
                                type="number"
                                variant="outlined"
                                fullWidth
                                {...register('sueldoPretendido', {
                                    required: 'Este campo es requerido',

                                })}
                                error={!!errors.sueldoPretendido}
                                helperText={errors.sueldoPretendido?.message}
                                inputProps={{
                                    max: 10000,
                                    min: 1
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth >
                                <InputLabel id="tipoId">¿Es una persona con discapacidad? </InputLabel>
                                <Select
                                    variant='outlined'
                                    sx={{ mt: 1 }}
                                    labelId="discapacidad"
                                    id="discapacidad"
                                    label="tipo"
                                    required
                                    defaultValue={postulante.discapacidad || 0}
                                    {...register('discapacidad', {
                                        required: 'Este campo es requerido',

                                    })}
                                    error={!!errors.discapacidad}
                                >
                                    <MenuItem value={0}>No</MenuItem>
                                    <MenuItem value={1}>Si</MenuItem>



                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth >
                                <InputLabel id="tipoId">¿Es exalumno de la institución? </InputLabel>
                                <Select
                                    variant='outlined'
                                    sx={{ mt: 1 }}
                                    labelId="exalumno"
                                    id="exalumno"
                                    label="exalumno"
                                    required
                                    defaultValue={postulante.exalumno || 0}
                                    {...register('exalumno', {
                                        required: 'Este campo es requerido',

                                    })}
                                    onChange={(e) => verificar(e)}
                                    error={!!errors.exalumno}
                                >
                                    <MenuItem value={0}>No</MenuItem>
                                    <MenuItem value={1}>Si</MenuItem>



                                </Select>
                                <FormHelperText>En caso de ser exalumno, llenar año de egreso</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>

                            <TextField

                                label="Egreso"
                                disabled={ex}

                                variant="outlined"
                                sx={ex ? { display: 'none' } : { display: 'block' }}
                                fullWidth

                                {...register('egreso', {


                                })}
                                error={!!errors.egreso}
                                helperText={errors.egreso?.message}
                            />

                        </Grid>
                        <Grid item xs={12} md={2}>

                            <TextField
                                label="Numero de Hijos(as)"

                                type="number"
                                variant="outlined"
                                fullWidth
                                {...register('hijos', {
                                    required: 'Este campo es requerido',
                                    maxLength: { value: 2, message: 'Máximo 2 dígitos' },

                                })}
                                error={!!errors.hijos}
                                helperText={errors.hijos?.message}
                                inputProps={{
                                    max: 15,
                                    min: 0
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth >
                                <InputLabel id="tipoId">Nivel educativo en el que se desempeña</InputLabel>
                                <Select sx={{ mt: 1 }}
                                    variant='outlined'

                                    labelId="nivel"
                                    id="nivel"
                                    label="tipo"
                                    required
                                    defaultValue={postulante.nivel || 'ninguno'}
                                    {...register('nivel', {
                                        required: 'Este campo es requerido',

                                    })}
                                    error={!!errors.nivel}
                                >
                                    <MenuItem value={'ninguno'} >Ninguno</MenuItem>
                                    <MenuItem value={'Inicial'}>Inicial</MenuItem>
                                    <MenuItem value={'Primaria'}>Primaria</MenuItem>
                                    <MenuItem value={'Secundaria'}>Secundaria</MenuItem>
                                    <MenuItem value={'Preuniversitario'}>Preuniversitario</MenuItem>
                                    <MenuItem value={'Universitario'}>Universitario</MenuItem>
                                </Select>
                                <FormHelperText>*Solo si postula para docente</FormHelperText>
                            </FormControl>
                        </Grid>



                    </Grid>
                </Box>
                <Box mt={2} padding={4} borderRadius={4} bgcolor={'#FFF'}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>

                            <FormLabel >Foto*</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                // startIcon={ <UploadOutlined /> }
                                disabled={getValues('image') ? true : false}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Cargar Foto
                            </Button>
                            <FormHelperText>*Imagen actual con presentación formal.</FormHelperText>
                            <input
                                ref={fileInputRef}
                                type="file"

                                accept='image/png, image/gif, image/jpeg'
                                style={{ display: 'none' }}
                                onChange={handleUpload}
                            />

                        </Grid>


                        <Grid item xs={12} md={6}>
                            <FormLabel >DNI</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                // startIcon={ <UploadOutlined /> }
                                disabled={getValues('imgs').length === 2 ? true : false}
                                onClick={() => dniInputRef.current?.click()}
                            >
                                Cargar DNI
                            </Button>
                            <FormHelperText>*Cargar dos imagenes, uno de cada cara de su DNI</FormHelperText>
                            <input
                                ref={dniInputRef}
                                type="file"
                                multiple
                                accept='image/png, image/gif, image/jpeg'
                                style={{ display: 'none' }}
                                onChange={onFilesSelectedDni}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Typography sx={{ display: loadImg ? 'block' : 'none' }} >Subiendo...</Typography>
                            <LinearProgress sx={{ display: loadImg ? 'block' : 'none' }} />
                            <Grid container spacing={2}>
                            </Grid>
                            {
                                getValues('image') && (
                                    <Box width={150} >

                                        <Card>

                                            <CardMedia
                                                component='img'
                                                className='fadeIn'
                                                image={`${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${getValues('image')}`}
                                                alt={getValues('image')}
                                                onLoad={() => setLoadImg(false)}
                                            />
                                            <CardActions>
                                                <Button
                                                    fullWidth
                                                    color="error"
                                                    onClick={() => onDeleteImage()}
                                                    onLoad={() => setLoadImg(false)}
                                                >
                                                    Borrar
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Box>)

                            }


                        </Grid>


                        <Grid item xs={12} md={6} >
                            <Typography sx={{ display: loadImgDni ? 'block' : 'none' }} >Subiendo DNI...</Typography>
                            <LinearProgress sx={{ display: loadImgDni ? 'block' : 'none' }} />
                            <Typography>DNI</Typography>
                            <Grid container spacing={2}>
                                {
                                    getValues('imgs').map((img: any) => (
                                        <Grid item xs={4} sm={3} key={img.image}>
                                            <Card>
                                                <CardMedia
                                                    component='img'
                                                    className='fadeIn'
                                                    image={`${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${img.image || img}`}
                                                    alt={'imagen dni'}
                                                    onLoad={() => setLoadImgDni(false)}
                                                />
                                                <CardActions>
                                                    <Button
                                                        fullWidth
                                                        color="error"
                                                        onClick={() => onDeleteImageDni(img.image)}
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>



                        </Grid>



                    </Grid>
                    <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }} >

                        <Button disabled={isSaving} type='submit' size="large" sx={{ marginTop: 2, textAlign: 'end', width: '100%' }} endIcon={<EastIcon />} >Continuar</Button>
                    </Box>
                </Box>





            </form >

        </Box >

    )
}