import React from 'react';
import FormStepper from './FormStepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import { Router, useRouter } from 'next/router';

const steps = [
    { label: 'Paso 1', content: <Step1 /> },
    { label: 'Paso 2', content: <Step2 /> },
    { label: 'Paso 3', content: <Step3 /> },
    { label: 'Paso 4', content: <Step4 /> },
    { label: 'Paso 5', content: <Step5 /> },
];

const Form = () => {
    const router = useRouter();
    const handleSubmit = () => {
        router.push(`/postulant/`)
    };
    return (
        <div>
            <FormStepper onSubmit={handleSubmit} />
        </div>
    );
};

export default Form;
