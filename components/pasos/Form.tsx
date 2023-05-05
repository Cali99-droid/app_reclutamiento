import React, { useContext } from 'react';
import FormStepper from './FormStepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import { Router, useRouter } from 'next/router';
import { DatosContext } from '@/context';
import { useEffect } from 'react';
import { Box } from '@mui/material';



const Form = () => {
    const { setEstudios, setCargos, setCapacitacion, setReconocimiento, setAficion } = useContext(DatosContext)
    useEffect(() => {
        setEstudios()
        setCargos();
        setCapacitacion();
        setReconocimiento();
        setAficion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const router = useRouter();
    const handleSubmit = () => {
        router.push(`/postulant/`)
    };

    return (
        <Box padding={6} bgcolor={'#FFF'} borderRadius={5} mb={2}>
            <FormStepper onSubmit={handleSubmit} />
        </Box>
    );
};

export default Form;
