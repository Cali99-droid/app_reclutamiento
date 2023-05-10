
import { Box, Button, Grid, TextField, Link, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '@/helpers';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/';
import { ErrorOutline } from '@mui/icons-material';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


type FormData = {
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  email: string;
  password: string;
  fechaNac: Date
};


export default function RegisterPage() {
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
  const onRegisterForm = async ({ nombre, apellidoPat, apellidoMat, email, password, fechaNac }: FormData,) => {

    setShowError(false);
    const { hasError, message } = await registerUser(nombre, apellidoPat, apellidoMat, email, password, fechaNac);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    router.replace('/auth/confirm');
    // await signIn('credentials', { email, password });

    //  Inicar session */




  }
  return (
    <AuthLayout title={"Registrate y Postula "} >
      <Box sx={{ width: 350, }} >
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
                color="secondary"

                size='large'
                fullWidth>
                Registrarme
              </Button>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
              <Box >
                <Typography> ¿Ya tienes una cuenta?
                  <NextLink
                    passHref
                    legacyBehavior

                    color="secondary"
                    href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}


                  >
                    <Link> Iniciar Sesion</Link>
                  </NextLink>
                </Typography>

              </Box>

              <Box textAlign={'right'}>
                <NextLink

                  color="secondary"
                  href={"/auth/forget"}
                  passHref
                  legacyBehavior>
                  <Link >Olvide mi contraseña
                  </Link>
                </NextLink>

              </Box>

            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  )
}
