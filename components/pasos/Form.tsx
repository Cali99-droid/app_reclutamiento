import React, { useContext } from 'react';
import FormStepper from './FormStepper';

import { Router, useRouter } from 'next/router';
import { DatosContext } from '@/context';
import { useEffect } from 'react';
import { Alert, Box, Button, MobileStepper, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';



const Form = () => {
    const { setEstudios, setCargos, setCapacitacion, setReconocimiento, setAficion } = useContext(DatosContext)
    const { activeStep, handleBack, handleNext, steps, handleReset } = useContext(DatosContext)
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
    const theme = useTheme();
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box borderRadius={5} >

            {matches ? (
                <FormStepper onSubmit={handleSubmit} />
            ) : (
                <>
                    {activeStep !== steps.length && (steps[activeStep].content)}
                    {activeStep === steps.length && (
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} gap={1} mb={5}>
                            <Box flex={2}>
                                <Alert > Haz Completado todos tus datos</Alert>
                            </Box>
                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <Button variant='outlined' color='info' onClick={() => router.push('/postulant/ficha')}>Ver mi ficha</Button>
                                <Button variant='outlined' onClick={handleReset}>Comenzar de nuevo</Button>

                            </Box>
                        </Box>
                    )}
                    <MobileStepper
                        variant="dots"
                        steps={steps.length}
                        position="static"
                        activeStep={activeStep}
                        sx={{ display: activeStep === 0 ? 'none' : '', mt: 2 }}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === steps.length}
                            >
                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Atrás
                            </Button>
                        }
                    />
                </>


            )}


        </Box>
    );
};

export default Form;
