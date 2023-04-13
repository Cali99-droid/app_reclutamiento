
import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, CardContent, CardActionArea, IconButton } from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

import { IPostulant } from '@/interfaces';


import NextLink from 'next/link';
import { FC, useContext, useState, useEffect } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { PostContext, UiContext } from '@/context';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '../modal/Modal';


import {  toast } from 'react-toastify';


const steps = ['Preselección', 'Entrevista', 'Evaluación', 'Negociación','Contrato'];

interface Props {
    postulant: IPostulant;
    index:number;
}


export const PostulantCard: FC<Props> = ({ postulant,index }) => {


   
   
    const{backPhase, activeStep,contrato,marcarApto,quitarApto,verificarVacio } = useContext(PostContext)
  
    const [open, setOpen] = useState(false);

   

    const [fav, setFav] = useState(false);

    const handleFav = ()=>{
 
        //toast.info(`Actualizando seleccion ${postulant.nombres}`);
        
        setFav(!fav)
       
    }
 
    const handleClickOpen = () => {
          setOpen(true);
    };

    const handleClose = () => {
          setOpen(false);
    };
    
  const handleConfirm = () => {
    // aquí puedes ejecutar cualquier acción que necesites cuando el usuario confirma la ventana modal
    toast.success(`Promoviendo al postulante ${postulant.nombres}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
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
                {
                    !contrato &&(
                        <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
                        {
                            postulant.apto 
                            ?
                            <IconButton color='primary'  onClick={()=>{                      
                                handleFav()
                                quitarApto(postulant)
                        
    
                                 }}  >
                            <FavoriteIcon/>
                            </IconButton>
                        :
                              <IconButton color='primary' onClick={()=>{
                               handleFav()
                                marcarApto(postulant);
                                
                              
                                
                                }} >
                                <FavoriteBorderIcon/>
                             </IconButton>
                       
                        }
                      
                    
                       
                                <Box>
                                {activeStep !== 0
                                ?( <IconButton 
                                    aria-label="remove to favorites"
                                    onClick={()=>{                      
                                            backPhase(postulant) 
                                    }}                   
                                    >
                                        <ThumbDownAltOutlinedIcon  />
                                </IconButton>)
                                :''
                                }                       
                                </Box>
    
                      
                            <IconButton>
                                <ExpandMoreIcon />
                            </IconButton>
                        
                     
                    
                        </CardActions>
                    )
                       

                }
             
                
               
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
