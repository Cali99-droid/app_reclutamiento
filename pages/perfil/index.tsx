import { Paperbase } from '@/components/dash';
import { AuthContext } from '@/context';
import { validations } from '@/helpers';
import { ErrorOutline } from '@mui/icons-material';
import { Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { persona } from '@prisma/client';
import { checkUserEmailPassword } from '@/database/dbUser';
import { reclutApi } from '@/apies';


interface Props {

    user: any;
}

type FormData = {
    nombre: string;
    apellidoPat: string;
    apellidoMat: string;
    email: string;
    password: string;
    newPassword: string;

};

const PerfilPage: NextPage<Props> = ({ user }) => {

    const router = useRouter();
    const { updateUser, logout } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            nombre: user.persona.nombres,
            apellidoPat: user.persona.apellido_pat,
            apellidoMat: user.persona.apellido_mat,
            email: user.email,

        }
    });



    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { data, status } = useSession();


    const onRegisterForm = async ({ nombre, apellidoPat, apellidoMat, email, password, newPassword }: FormData,) => {

        setShowError(false);

        const { hasError, message } = await updateUser(user.persona.id, nombre, apellidoPat, apellidoMat, email, password, newPassword);

        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        alert('Datos Actualizados correctamente,vuelva a inciar session')
        logout()
        router.replace('/perfil');
        // // await signIn('credentials', { email, password });

        // //  Inicar session */




    }

    return (
        <Paperbase title={"Mi perfil "} subTitle={"Listado de convocatorias"} >
            <Paper sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden', padding: 4 }}>

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
                                type="email"
                                label="Correo"
                                variant="outlined"

                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                disabled
                            />


                        </Grid>


                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Contraseña Anterior"
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
                            <TextField
                                required
                                label="Contraseña Nueva"
                                type='password'
                                variant="outlined"
                                fullWidth
                                {...register('newPassword', {
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
                                Actualizar Datos
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>


        </Paperbase>


    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });

    if (session) {
        const { user } = session;
        return {
            props: {
                user

            }
        }
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }




}

export default PerfilPage