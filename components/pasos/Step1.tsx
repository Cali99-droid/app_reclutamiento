
import { Box, Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import { validations } from '@/helpers';
import { ErrorOutline } from '@mui/icons-material';
import { reclutApi } from '@/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { DatosContext } from '@/context';

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

const Step1 = () => {



    const { activeStep, handleBack, handleNext, steps, pos } = useContext(DatosContext)


    const [isSaving, setIsSaving] = useState(true);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const onRegisterForm = async (form: FormData) => {
        setIsSaving(true);
        try {
            // const { data } = await reclutApi({
            //     url: '/postulants',
            //     method: form.idPostulante > 0 ? 'PUT' : 'POST',  // si tenemos un _id, entonces actualizar, si no crear
            //     data: form
            // });
            handleNext()

            // if (!(form.idPostulante > 0)) {
            //     router.replace(`/postulant`);

            // } else {
            //     setIsSaving(false)
            // }
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
        <Box padding={6}>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
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
                                value={1}
                                {...register('tipoId', {
                                    required: 'Este campo es requerido',

                                })}
                                error={!!errors.tipoId}
                            >

                                <MenuItem value={1}>DNI</MenuItem>
                                <MenuItem value={2}>Carnet</MenuItem>
                            </Select>
                            <FormHelperText>Tipo de documento: DNI, Carné, etc</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>

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
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth >
                            <InputLabel id="tipoId">Estado Civil </InputLabel>
                            <Select
                                variant='outlined'
                                sx={{ mt: 1 }}
                                labelId="tipoId"
                                id="tipoId"
                                label="tipo"
                                required
                                value={1}
                                {...register('tipoId', {
                                    required: 'Este campo es requerido',

                                })}
                                error={!!errors.tipoId}
                            >
                                <MenuItem value={1}>Soltero</MenuItem>
                                <MenuItem value={2}>Casado</MenuItem>
                                <MenuItem value={3}>Viudo</MenuItem>
                                <MenuItem value={4}>Divorciado</MenuItem>

                            </Select>

                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth >
                            <InputLabel id="tipoId">¿Es exalumno de la institución? </InputLabel>
                            <Select
                                variant='outlined'
                                sx={{ mt: 1 }}
                                labelId="tipoId"
                                id="tipoId"
                                label="tipo"
                                required
                                value={1}
                                {...register('tipoId', {
                                    required: 'Este campo es requerido',

                                })}
                                error={!!errors.tipoId}
                            > <MenuItem value={1}>No</MenuItem>
                                <MenuItem value={2}>Si</MenuItem>



                            </Select>
                            <FormHelperText>En caso de ser exalumno, llenar año de egreso</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={1}>

                        <TextField
                            label="Egreso"
                            disabled
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
                    <Grid item xs={12} md={4}>

                        <TextField
                            label="Numero de Hijos(as)"

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
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth >
                            <InputLabel id="tipoId">¿Es una persona con discapacidad? </InputLabel>
                            <Select
                                variant='outlined'
                                sx={{ mt: 1 }}
                                labelId="tipoId"
                                id="tipoId"
                                label="tipo"
                                required
                                value={1}
                                {...register('tipoId', {
                                    required: 'Este campo es requerido',

                                })}
                                error={!!errors.tipoId}
                            >
                                <MenuItem value={1}>No</MenuItem>
                                <MenuItem value={2}>Si</MenuItem>



                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth >
                            <InputLabel id="tipoId">Nivel educativo </InputLabel>
                            <Select sx={{ mt: 1 }}
                                variant='outlined'
                                defaultValue={1}
                                labelId="tipoId"
                                id="tipoId"
                                label="tipo"
                                required

                                {...register('tipoId', {
                                    required: 'Este campo es requerido',

                                })}
                                error={!!errors.tipoId}
                            >

                                <MenuItem value={1}>Inicial</MenuItem>
                                <MenuItem value={2}>Secundaria</MenuItem>
                                <MenuItem value={3}>Preuniversitario</MenuItem>
                                <MenuItem value={4}>Universitario</MenuItem>
                            </Select>
                            <FormHelperText>*Solo si postula para docente</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>



                            {activeStep !== steps.length - 1 && (
                                <Button
                                    endIcon={<NavigateNextIcon />}
                                    // disabled={isSaving}
                                    type='submit'
                                    size='large'
                                    color="info"

                                >
                                    Siguiente
                                </Button>
                            )}
                        </Box>
                    </Grid>



                </Grid>

            </form>
        </Box>

    );
};

export default Step1;