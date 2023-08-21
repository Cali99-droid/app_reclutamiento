import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Divider, useMediaQuery, Typography, Alert, Chip, Link } from '@mui/material';
import { useContext } from 'react';
import { DatosContext } from '@/context/datos';
import LabelIcon from '@mui/icons-material/Label';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/router';
import { CheckCircle, DocumentScanner, FileOpen, RestartAlt } from '@mui/icons-material';
import PostAddIcon from '@mui/icons-material/PostAdd';
type FormStepperProps = {
    // steps: { label: string; content: JSX.Element, icon: any }[];
    onSubmit: () => void;
};

const FormStepper = ({ onSubmit }: FormStepperProps) => {
    const matches = useMediaQuery('(min-width:600px)');
    const { activeStep, handleBack, handleNext, steps, handleReset } = useContext(DatosContext)

    const isLastStep = activeStep === steps.length - 1;
    const router = useRouter();

    return (
        <>
            <Stepper activeStep={activeStep} orientation={matches ? 'horizontal' : 'vertical'} sx={{ padding: 4 }} >
                {steps.map(({ label, icon }, index) => (
                    <Step key={label} sx={{ color: '#FFF' }} >
                        <Box display={'flex'} flexDirection={'column'} alignItems={matches ? 'center' : 'start'} >
                            <Box width={'50px'} height={'50px'} padding={3} bgcolor={activeStep === index ? '#0045aa' : '#EECA73'} display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'50%'}>{icon}

                            </Box>
                            <StepLabel >{label}</StepLabel>
                        </Box>
                    </Step>
                ))}
            </Stepper >


            < Box display={'flex'} justifyContent={'space-between'} gap={1} padding={4} mt={2}>
                {activeStep === steps.length ? (
                    <Box width={'100%'} display={'flex'} justifyContent={'space-between'} gap={1}>
                        <Box flex={2}>
                            <Alert > Haz Completado todos tus datos</Alert>
                        </Box>
                        <Box display={'flex'} gap={2} alignItems={'center'}>
                            <Button startIcon={<PostAddIcon />} onClick={() => router.push('/convocatorias')} variant='contained' >Postular</Button>
                            <Button startIcon={<FileOpen />} variant='outlined' color='info' onClick={() => router.push('/postulant/ficha')}>Ver mi ficha</Button>
                            <Button startIcon={<RestartAlt />} variant='outlined' onClick={handleReset}>Actualizar</Button>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Button disabled={activeStep === 0} startIcon={<KeyboardBackspaceIcon />} variant="contained" onClick={handleBack}>
                            Atrás
                        </Button>
                        <Button onClick={handleNext} endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : <EastIcon />}>
                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                        </Button>
                    </>

                )

                }



                {/* {
                    (activeStep !== steps.length - 1) && (activeStep !== 0) && (
                        <Button endIcon={<EastIcon />} variant="contained" onClick={handleNext}>
                            Siguiente
                        </Button>
                    )
                }
                {
                    isLastStep && (
                        <Box display={'flex'} gap={1}>
                           
                            <Button variant="contained" onClick={handleNext} color="primary" >
                                Finalizar
                            </Button>

                        </Box>

                    )
                } */}

            </Box >
            {activeStep !== steps.length && (steps[activeStep].content)}

        </>
    );
};

export default FormStepper;
