import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PostulantsList } from '../postulants/PostulantsList';
import { PostContext } from "@/context";

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Divider, IconButton } from "@mui/material";


import Modal from '../modal/Modal';

/**Cabiar segun bd */
const steps = ['Preselección', 'Entrevista', 'Evaluación', 'Negociación','Contrato'];

export const LinearStepper=()=> {

    const {handleNext,activeStep,filteredData,handleBack,handleReset,postulants,empty} = useContext(PostContext);
console.log(activeStep)
    /**Modal de confirmacion para finalizar fase */
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
     
      setOpen(true);   
    };

    const handleClose = () => {
 
          setOpen(false);
    };
    const handleConfirm = () => {
     
      // aquí puedes ejecutar cualquier acción que necesites cuando el usuario confirma la ventana modal
      handleNext();
      handleClose();
    };

    const cantidadFase = ()=>{
        const data =  postulants.filter((item) => {
            return item.apto === true; 
            }
        );

      return data.length;
    }
   
  return (
    <Box className="fadeIn">
      <Box sx={{ width: '100%', mt:5,bgcolor:'#F3F3F3', 
      padding:3,
      borderRadius:5,
       }}>
      <Typography fontSize={30} fontWeight={'bold'} sx={{  mb: 2 }}>Fases</Typography>
  
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
         <Typography textAlign={'center'} fontWeight={'bold'} color={'#EC508B'} fontSize={20} sx={{ mt: 5 }}>
           ! Ha finalizado el proceso, tenemos nuevo personal ! 
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Ver resumen</Button>
          </Box>
         
        </>
      ) : (
        <>
          <Box display={'flex'} alignItems={'center'} gap={1} mt={3}>
            <Typography variant="body1" color={'#000'}> Se encuentra en  fase de: </Typography>
            <Typography  variant="subtitle1" color={'info'} >{steps[activeStep]}</Typography> 
          </Box>
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
           
            <Button onClick={handleClickOpen}  disabled={empty}>
              {activeStep === steps.length - 1  ? 'Contratar y Terminar Proceso' : 'Finalizar Fase'}
            </Button>
          </Box>
        </>
      )}
       
       
    </Box>
    <Box>
      <Box sx={{
          bgcolor:'#F3F3F3', 
          padding:3,
          borderRadius:5,
          mt:2
          }}>
              <Box display={'flex'} justifyContent={'space-between'} >
                {activeStep === steps.length 
                ?(<Typography variant="h2" fontWeight={'bold'}>Lista de Contratados</Typography>)
                :(<Typography variant="h2" fontWeight={'bold'}>Postulantes aptos para esta fase :   {filteredData.length}     </Typography>)}
                  
                  <IconButton aria-label="Mostrar Ocultos">
                  <VisibilityOffIcon/>
                  </IconButton>
              </Box> 
              <Divider/>
              <PostulantsList postulants={filteredData} />
          </Box>
        
    </Box>
        <Modal
            title={cantidadFase() >= 0 ?'¿Esta seguro de continuar?':'¡Debe seleccionar un postulante!'}  
            open={open}
            handleClose={handleClose}
            handleConfirm={ cantidadFase() >= 0?handleConfirm:handleClose}
          >
            {
              cantidadFase() >= 0?(
                activeStep === steps.length - 1 
                  ? <p>El proceso de selección finalizará y no podrá evaluar nuevamente</p> 
                  : <p>Continuará a la fase de <strong>{`${steps[activeStep+1]}`} </strong>con <strong>{cantidadFase()}</strong> postulantes selecionados</p>
              )
              :
              (
                <p>Debe seleccionar por lo menos un postulante</p>
              )
            }
         
            
               
        </Modal>
  </Box>
    
  );
}
