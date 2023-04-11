
import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, CardContent, CardActionArea, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

import { IPostulant } from '@/interfaces';


import NextLink from 'next/link';
import { FC, useContext, useState } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PostContext, UiContext } from '@/context';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ModalConfirmAdvance } from '../modal/ModalConfirmAdvance';
import Modal from '../modal/Modal';

const steps = ['Preselección', 'Entrevista', 'Evaluación', 'Negociación','Contrato'];

interface Props {
    postulant: IPostulant;
    index:number;
}


export const PostulantCard: FC<Props> = ({ postulant,index }) => {



    const{backPhase, activeStep,contrato,advancePhase} = useContext(PostContext)

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
          setOpen(true);
    };

    const handleClose = () => {
          setOpen(false);
    };
    
  const handleConfirm = () => {
    // aquí puedes ejecutar cualquier acción que necesites cuando el usuario confirma la ventana modal
    advancePhase(postulant);
  };


    return (
        <Grid item   
        xs={12} 
        sm={3}
        > 
            <Card sx={{ maxWidth: 345 }}>      
            <NextLink   href={`#`} passHref prefetch={ false } legacyBehavior>

                <Link>
                    <CardActionArea>
                    <CardMedia
                        sx={{ height: 220 }}
                        image={`/postulants/${postulant.img}.jpg`}
                        // title={job.titulo}
                    />
                    <CardContent>
                        <Typography fontWeight={'bold'} color={'#FFBC58'}># {index+1}</Typography>
                        <Typography gutterBottom variant="h5" component="div">
                        {postulant.nombres + ' ' + postulant.apellido_paterno + ' '+postulant.apellido_materno}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {postulant.grado}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Puntaje:{postulant.puntaje_in}
                        </Typography>
                            
                        {/* <Box mt={1}>
                            <Chip label={`${job.categoria}`} color="success" variant="outlined" />
                        </Box> */}
                    </CardContent>  
                    </CardActionArea>
                    
                </Link>
                </NextLink>
                <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
                    {
                        !contrato
                        ?(
                            <Box>
                            {activeStep !== 0
                            ?( <IconButton 
                                aria-label="remove to favorites"
                                onClick={()=>{                      
                                        backPhase(postulant) 
                                }}                   
                                >
                                    <RemoveCircleIcon fontSize="large" />
                            </IconButton>)
                            :''
                            }                       
                        {
                            activeStep === 4
                            ?
                                ''                           
                            :(  <IconButton aria-label="add to favorites" onClick={handleClickOpen}>
                                <AddCircleIcon fontSize="large" color="secondary"/>
                            </IconButton>)
                        }

                    </Box>

                        )
                        :(
                            ''
                        )
                    }
                  
                    
                        <IconButton>
                            <ExpandMoreIcon />
                        </IconButton>
                    
                 
                
                    </CardActions>
                
               
            </Card>

            <Modal
                title="¿Esta seguro de pasar al postulante a la siguiente fase?"
                open={open}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
            >
                <p>El postulante <strong>{postulant.nombres}</strong> sera agregado a la fase de <strong>{`${steps[activeStep+1]}`}</strong></p>
            </Modal>
        </Grid>
    )
}
