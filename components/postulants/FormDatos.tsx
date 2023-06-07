import { reclutApi } from '@/apies';
import { validations } from '@/helpers';
import { IGrado, IPersona, IUser } from '@/interfaces';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography, Divider, SelectChangeEvent, FormLabel, Card, CardMedia, CardActions } from '@mui/material';
import { postulante } from '@prisma/client';
import axios from 'axios';
import moment from 'moment';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import EastIcon from '@mui/icons-material/East';
import { useContext, ChangeEvent } from 'react';
import { DatosContext } from '@/context';
interface Props {

    grados: IGrado[]
    persona: IPersona;
    postulante: postulante
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
    nivel: string;

};


export const FormDatos: NextPage<Props> = ({ persona, grados, postulante }) => {

    const [isSaving, setIsSaving] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [ex, setEx] = useState(true)

    const router = useRouter();
    const { handleNext } = useContext(DatosContext)


    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<FormData>({
        mode: 'all',
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
            estadoCivil: postulante.estado_civil === null ? '' : postulante.estado_civil,
            exalumno: postulante.exalumno === null ? 0 : parseInt(postulante.exalumno.toString()),
            egreso: postulante.egreso === null ? 1990 : postulante.egreso,
            hijos: postulante.hijos === null ? 0 : postulante.hijos,
            sueldoPretendido: postulante.sueldo,
            discapacidad: postulante.discapacidad === null ? 0 : postulante.discapacidad,
            nivel: postulante.nivel === null ? '' : postulante.nivel,

            gradoId: postulante.gradoId,
            image: postulante.image === null ? '' : postulante.image,

        }
    })
    const onRegisterForm = async (form: FormData) => {
        //setIsSaving(true);


        try {
            const { data } = await reclutApi({
                url: '/postulants',
                method: form.idPostulante > 0 ? 'PUT' : 'POST',  // si tenemos un _id, entonces actualizar, si no crear
                data: form
            });
            handleNext()
            router.replace(`/postulant`);
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

    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }

        try {

            // console.log( file );
            for (const file of target.files) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await reclutApi.post<{ message: string }>('/postulants/upload', formData);
                setValue('image', data.message, { shouldValidate: true });
                console.log(data)
            }


        } catch (error) {
            console.log({ error });
        }
    }
    const onDeleteImage = () => {
        // console.log(getValues('image'))
        setValue(
            'image',
            '', { shouldValidate: true }
        );
        // console.log(getValues('image'))

    }
    return (
        <Box className="fadeIn" marginTop={-10}>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate >
                <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }} >

                    <Button disabled={isSaving} type='submit' size="large" sx={{ marginTop: 2, textAlign: 'end' }} endIcon={<EastIcon />} >Continuar</Button>
                </Box>
                <Box padding={4} border={'solid 1px #AAAABC'} borderRadius={4} >
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
                                    <MenuItem value={'Secundaria'}>Secundaria</MenuItem>
                                    <MenuItem value={'Preuniversitario'}>Preuniversitario</MenuItem>
                                    <MenuItem value={'Universitario'}>Universitario</MenuItem>
                                </Select>
                                <FormHelperText>*Solo si postula para docente</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box>
                                <FormLabel >Foto</FormLabel>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    // startIcon={ <UploadOutlined /> }

                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Cargar imagen
                                </Button>
                                <FormHelperText>*Imagen actual con presentación formal.</FormHelperText>
                                <input
                                    ref={fileInputRef}
                                    type="file"

                                    accept='image/png, image/gif, image/jpeg'
                                    style={{ display: 'none' }}
                                    onChange={onFilesSelected}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>


                            {
                                getValues('image') && (
                                    <Box width={150} margin={'auto'}>
                                        <Card>
                                            <CardMedia
                                                component='img'
                                                className='fadeIn'
                                                image={getValues('image')}
                                                alt={getValues('image')}

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


                    </Grid>

                </Box>



            </form >

        </Box >

    )
}
