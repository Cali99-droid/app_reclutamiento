import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { DatosContext } from '@/context/datos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
type FormStepperProps = {
    // steps: { label: string; content: JSX.Element, icon: any }[];
    onSubmit: () => void;
};

const FormStepper = ({ onSubmit }: FormStepperProps) => {

    const { activeStep, handleBack, handleNext, steps } = useContext(DatosContext)

    const isLastStep = activeStep === steps.length - 1;

    return (
        <>
            <Stepper activeStep={activeStep} >
                {steps.map(({ label, icon }, index) => (
                    <Step key={label} >
                        <Box width={'60px'} height={'60px'} padding={4} bgcolor={activeStep === index ? '#0045AA' : '#FFF'} display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'50%'}>{icon}

                        </Box>
                        <StepLabel StepIconComponent={ArrowDropDownIcon} >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper >
            {steps[activeStep].content}
            < Box display={'flex'} justifyContent={'end'} >
                {activeStep !== 0 && (
                    <Button variant="contained" color="secondary" onClick={handleBack}>
                        Atrás
                    </Button>
                )
                }
                {
                    (activeStep !== steps.length - 1) && (activeStep !== 0) && (
                        <Button size='large' variant="contained" color="info" onClick={handleNext}>
                            Siguiente
                        </Button>
                    )
                }
                {
                    isLastStep && (
                        <Button variant="contained" color="primary" onClick={onSubmit}>
                            Finalizar
                        </Button>
                    )
                }
                {
                    activeStep !== 0 && (
                        <Button variant="contained" color="info" >
                            Reiniciar
                        </Button>
                    )
                }
            </Box >
        </>
    );
};

export default FormStepper;
