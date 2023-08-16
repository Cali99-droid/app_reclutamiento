
import { Box, Button, Grid, TextField, Link, Chip, FormControl, InputLabel, Select, MenuItem, FormHelperText, useMediaQuery, Divider, CircularProgress, createSvgIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '@/helpers';
import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '@/context/';
import { ErrorOutline } from '@mui/icons-material';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { blue, green } from '@mui/material/colors';
import { DateField } from '@mui/x-date-pickers';
import { toast } from 'react-toastify';


type FormData = {
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  email: string;
  password: string;
  fechaNac: Date
  tipoId: number;
  numeroDocumento: string;
};


export default function RegisterPage() {
  const [providers, setProviders] = useState<any>({})
  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov)
    })
  }, [])

  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<FormData>();



  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { data, status } = useSession();

  useEffect(() => {

    if (status === 'authenticated') {
      const destination = router.query.p?.toString() || '/';
      router.replace(destination);
    }


  }, [router, status])
  const onRegisterForm = async ({ nombre, apellidoPat, apellidoMat, email, password, fechaNac, tipoId, numeroDocumento }: FormData,) => {
    if (!getValues('fechaNac')) {
      toast.error('Ingrese una fecha de nacimiento')
      return;
    }
    setLoading(true)
    setShowError(false);
    const { hasError, message } = await registerUser(nombre, apellidoPat, apellidoMat, email, password, fechaNac, tipoId, numeroDocumento);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      setLoading(false)
      return;
    }
    router.replace('/auth/confirm');
    // await signIn('credentials', { email, password });

    //  Inicar session */




  }
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };
  const GoogleIconS = createSvgIcon(
    // credit: plus icon from https://heroicons.com/
    <svg xmlns="http://www.w3.org/2000/svg" width="2443" height="2500" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>,
    'google',
  );
  const matches = useMediaQuery('(min-width:1000px)');
  const matchesH = useMediaQuery('(min-height:1000px)');
  const handleChengeDate = (val: any) => {
    setValue('fechaNac', val);

  }
  return (
    <AuthLayout title={"Registrate y Postula "} pageDescription={'Registrate y llena tu ficha para poder postular a los emplemos disponibles en  la institución educativa Albert Einstein'} >
      <Box bgcolor={'#FFF'} padding={4} className={'fadeIn'} mt={1}>
        <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
          <Chip
            label={errorMessage}
            color="error"
            icon={<ErrorOutline />}
            className="fadeIn"
            sx={{ display: showError ? 'flex' : 'none', mb: 4 }}

          />
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='end' flexDirection={'column'}>

              {
                Object.values(providers).map((provider: any) => {
                  if (provider.id === 'credentials') return (<div key={'credentials'}></div>)
                  return (
                    <Button
                      key={provider.id}
                      variant='outlined'
                      fullWidth
                      size='large'

                      startIcon={<GoogleIconS />}
                      onClick={() => signIn(provider.id)}
                    >{`Entrar con ${provider.name}`}
                    </Button>
                  )
                })
              }
              <Divider sx={{ marginTop: 1, marginBottom: 1 }}><Typography fontSize={15}>O regístrate</Typography>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                // size={matches ? 'small' : 'medium'}
                type="text"
                label="Nombres"
                variant="outlined"
                fullWidth
                required
                {...register('nombre', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                // size={matches ? 'small' : 'medium'}
                type="text"
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
            <Grid item xs={12}>
              <TextField
                // size={matches ? 'small' : 'medium'}
                type="text"
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
            <Grid item xs={12} md={12}>
              <FormControl fullWidth >
                <InputLabel id="tipoId">Tipo de Documento </InputLabel>
                <Select

                  labelId="tipoId"
                  id="tipoId"
                  label="tipo"

                  required

                  {...register('tipoId', {
                    required: 'Este campo es requerido',

                  })}
                  error={!!errors.tipoId}
                >

                  <MenuItem value={1} selected={true}>DNI</MenuItem>
                  <MenuItem value={2}>Carnet de Extranjeria</MenuItem>

                </Select>
                {/* <FormHelperText>Tipo de documento</FormHelperText> */}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
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
                // size={matches ? 'small' : 'medium'}
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
            <Grid item xs={12}>
              <DateField label="Fecha de nacimiento" fullWidth onChange={(newValue) => handleChengeDate(newValue)} />
              {/* <TextField
                size={matches ? 'small' : 'medium'}
                type="date"
                label='Fecha de nacimiento'
                variant="outlined"

                fullWidth
                required
                {...register('fechaNac', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                error={!!errors.fechaNac}
                helperText={errors.fechaNac?.message}
              /> */}

            </Grid>
            <Grid item xs={12}>
              <TextField
                // size={matches ? 'small' : 'medium'}
                type="email"
                label="Correo"
                variant="outlined"
                required
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />


            </Grid>

            <Grid item xs={12}>
              <TextField
                // size={matches ? 'small' : 'medium'}
                required
                label="Contraseña"
                type='password'
                variant="outlined"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>

              <Button
                type="submit"

                disabled={loading}
                size='medium'
                fullWidth>
                Registrarme{loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: blue[500],
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Button>

            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
              <Box >
                <Typography fontSize={13}> ¿Ya tienes una cuenta?
                  <NextLink
                    passHref
                    legacyBehavior
                    href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}


                  >
                    <Link sx={{ fontWeight: 'bold', textDecoration: 'underline' }} color="secondary"> Iniciar Sesión</Link>
                  </NextLink>
                </Typography>

              </Box>

              <Box textAlign={'right'}>
                <Typography fontSize={13}>
                  <NextLink

                    color="secondary"
                    href={"/auth/forgot-password"}
                    passHref
                    legacyBehavior>
                    <Link sx={{ fontWeight: 'bold', textDecoration: 'underline' }} color="secondary">Olvidé mi contraseña
                    </Link>
                  </NextLink>

                </Typography>

              </Box>

            </Grid>
          </Grid>
        </form>

      </Box>
    </AuthLayout >
  )
}
