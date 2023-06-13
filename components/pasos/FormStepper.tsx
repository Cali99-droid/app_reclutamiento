import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Divider, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { DatosContext } from '@/context/datos';
import LabelIcon from '@mui/icons-material/Label';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/router';
type FormStepperProps = {
    // steps: { label: string; content: JSX.Element, icon: any }[];
    onSubmit: () => void;
};

const FormStepper = ({ onSubmit }: FormStepperProps) => {
    const matches = useMediaQuery('(min-width:600px)');
    const { activeStep, handleBack, handleNext, steps } = useContext(DatosContext)

    const isLastStep = activeStep === steps.length - 1;
    const router = useRouter();
    return (
        <>
            <Stepper activeStep={activeStep} orientation={matches ? 'horizontal' : 'vertical'} sx={{ padding: 4 }}>
                {steps.map(({ label, icon }, index) => (
                    <Step key={label} sx={{ color: '#FFF' }}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={matches ? 'center' : 'start'} >
                            <Box width={'50px'} height={'50px'} padding={3} bgcolor={activeStep === index ? '#0045aa' : '#FFF'} display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'50%'}>{icon}

                            </Box>
                            <StepLabel >{label}</StepLabel>
                        </Box>
                    </Step>
                ))}
            </Stepper >


            < Box display={'flex'} justifyContent={'space-between'} gap={1} padding={4} mt={2}>

                {activeStep !== 0 && (
                    <Button startIcon={<KeyboardBackspaceIcon />} variant="contained" onClick={handleBack}>
                        Atrás
                    </Button>
                )
                }
                {
                    (activeStep !== steps.length - 1) && (activeStep !== 0) && (
                        <Button endIcon={<EastIcon />} variant="contained" onClick={handleNext}>
                            Siguiente
                        </Button>
                    )
                }
                {
                    isLastStep && (
                        <Button variant="contained" onClick={() => router.push('/postulant/ficha')} color="primary" >
                            Finalizar
                        </Button>
                    )
                }
                {
                    // activeStep !== 0 && (
                    //     <Button variant="contained" color="info" >
                    //         Reiniciar
                    //     </Button>
                    // )
                }
            </Box >
            {steps[activeStep].content}
        </>
    );
};

export default FormStepper;
