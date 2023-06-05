
import { Box, Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { validations } from '@/helpers';
import { ErrorOutline } from '@mui/icons-material';
import { reclutApi } from '@/apies';
import axios from 'axios';
import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { DatosContext } from '@/context';
import { persona, postulante } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';


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


    const { activeStep, handleBack, handleNext, steps, setPos, pos } = useContext(DatosContext)



    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            nombre: 'af',
            apellidoPat: 'dgv',
            email: 'string',
            telefono: 'string',
            direccion: 'string',
            nacimiento: 'string',
            tipoId: 1,
            numeroDocumento: 'string',
            experiencia: 1,
            sueldoPretendido: 1,
            especialidad: 'string',
            gradoId: 1,
        }
    })



    const [isSaving, setIsSaving] = useState(true);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const router = useRouter();


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
        <></>

    );
};



export default Step1;