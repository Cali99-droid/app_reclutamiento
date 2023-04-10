import { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PostulantsList } from '../postulants/PostulantsList';
import { PostContext } from "@/context";
import confetti from "canvas-confetti";



const steps = ['Preselección', 'Entrevista', 'Evaluación', 'Negociación','Contrato'];

export const LinearStepper=()=> {

    const {handleNext,activeStep,filteredData,handleBack,handleReset} = useContext(PostContext);
   
  return (
    <Box sx={{ width: '100%', mt:5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
        
         
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography fontWeight={'bold'} fontSize={20} sx={{ mt: 2, mb: 1 }}>
           Ha finalizado el proceso, los nuevos contratados son:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Volver</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography fontSize={20} fontWeight={'bold'} sx={{ mt: 2, mb: 1 }}> Fase {activeStep + 1}: {steps[activeStep]}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Volver
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
           
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Terminar Proceso' : 'Finalizar Fase'}
            </Button>
          </Box>
        </>
      )}
        <PostulantsList postulants={filteredData}/>
       
    </Box>
  );
}
