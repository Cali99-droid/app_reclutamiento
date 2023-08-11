
import { Box, Button, Grid, TextField, Link, Chip, FormControl, InputLabel, Select, MenuItem, FormHelperText, useMediaQuery, Divider, CircularProgress } from '@mui/material';
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
import GoogleIcon from '@mui/icons-material/Google';
import { blue, green } from '@mui/material/colors';


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
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();



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
  const styles = {
    // Define los estilos para el tamaño "pequeño"
    smallTextField: {
      fontSize: '12px',
      padding: '2px 4px',
    },
    // Define los estilos para el tamaño "mediano"
    mediumTextField: {
      fontSize: '14px',
      padding: '8px 12px',
    },
    // Define los estilos para el tamaño "grande"
    largeTextField: {
      fontSize: '18px',
      padding: '12px 16px',
    },
  };
  const matches = useMediaQuery('(min-width:1000px)');
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
            <Grid item xs={12}>
              <TextField
                size={matches ? 'small' : 'medium'}
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
                size={matches ? 'small' : 'medium'}
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
                size={matches ? 'small' : 'medium'}
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
            <Grid item xs={12}>

              <TextField
                size={matches ? 'small' : 'medium'}
                type="date"
                label='Fecha de nacimiento'
                variant="outlined"
                defaultValue={'1980-01-01'}
                fullWidth
                required
                {...register('fechaNac', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                error={!!errors.fechaNac}
                helperText={errors.fechaNac?.message}
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                size={matches ? 'small' : 'medium'}
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


            </Grid> <Grid item xs={12} md={12}>
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
                size={matches ? 'small' : 'medium'}
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
              <TextField
                size={matches ? 'small' : 'medium'}
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
        <Grid item xs={12} display='flex' justifyContent='end' flexDirection={'column'}>
          <Divider sx={{ width: '100%', mb: 2 }} />
          {
            Object.values(providers).map((provider: any) => {
              if (provider.id === 'credentials') return (<div key={'credentials'}></div>)
              return (
                <Button
                  key={provider.id}
                  variant='outlined'
                  fullWidth
                  size='medium'
                  startIcon={<GoogleIcon />}
                  onClick={() => signIn(provider.id)}
                >{`Entrar con ${provider.name}`}
                </Button>
              )
            })
          }

        </Grid>
      </Box>
    </AuthLayout >
  )
}
