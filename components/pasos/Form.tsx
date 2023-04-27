import React from 'react';
import FormStepper from './FormStepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const steps = [
    { label: 'Paso 1', content: <Step1 /> },
    { label: 'Paso 2', content: <Step2 /> },
    { label: 'Paso 3', content: <Step3 /> },
    { label: 'Paso 4', content: <Step4 /> },
    { label: 'Paso 5', content: <Step5 /> },
];

const Form = () => {

    const handleSubmit = () => {
        alert('Formulario enviado');
    };

    return (
        <div>
            <FormStepper steps={steps} onSubmit={handleSubmit} />
        </div>
    );
};

export default Form;
