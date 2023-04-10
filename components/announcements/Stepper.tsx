import { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PostulantsList } from '../postulants/PostulantsList';

import { PostContext } from "@/context/postulantes";



const steps = ['Preselección', 'Entrevista', 'Evaluación', 'Negociación'];

export default function AnnouncementsStepper() {


const {postulants} = useContext(PostContext);



 const [filter, setFilter] = useState(1);

 const filteredData = postulants.filter((item) => {
  if (filter === 0) {
    return true;
  } else {
    return item.fase === filter;
  }
});
 





  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    if ((activeStep+2) > 4) {
      setFilter(1);
      return;
    }
    setFilter(activeStep+2);
  
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setFilter(activeStep)
  };

  const handleStep = (step: number) => () => {
    setFilter(step+1)
    setActiveStep(step);
    
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%', mt:5 }} >
      <Stepper nonLinear activeStep={activeStep} >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div style={{}}>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Finalizó la Selección, tenemos un nuevo contratado
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Finalizar</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Fase {activeStep + 1}: {steps[activeStep]}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0} //condicion para evitar pasar a la siguiente fase si no termino la anteriro
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Volver
              </Button>
              <Box sx={{ flex: '1 1 auto' }}/>
              <Button  onClick={handleNext} sx={{ mr: 1 }}>
                Siguiente
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Fase {activeStep + 1} completada
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Proceso de elección finalizado'
                      : 'Finalizar Fase'}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </div>
      <PostulantsList postulants={filteredData}/>
    </Box>
      
  );
}