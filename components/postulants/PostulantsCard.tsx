
import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, CardContent, CardActionArea, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

import { IPostulant } from '@/interfaces';


import NextLink from 'next/link';
import { FC, useContext, useState } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PostContext, UiContext } from '@/context';



interface Props {
    postulant: IPostulant;
    index:number;
}


export const PostulantCard: FC<Props> = ({ postulant,index }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const{advancePhase,backPhase, activeStep} = useContext(PostContext)

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
                        sx={{ height: 250 }}
                        image={`/postulants/${postulant.img}.jpg`}
                        // title={job.titulo}
                    />
                    <CardContent>
                        <Typography fontWeight={'bold'}># {index+1}</Typography>
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
                <CardActions sx={{display:'flex', justifyContent:'flex-end'}}>
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
                    
                    :(  <IconButton aria-label="add to favorites" onClick={()=>{
                       handleClickOpen()
                       
                        
                        }}>
                        <AddCircleIcon fontSize="large" color="secondary"/>
                    </IconButton>)

                   }
                  
                    
                    </CardActions>
                
                
            </Card>




            <div>
              
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"¿Esta seguro de seleccionar al postulante para la siguiente fase?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`El postulante ${postulant.nombres} sera agregado a la fase siguiente`}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>{advancePhase(postulant)}}>Si</Button>
                    <Button onClick={handleClose} autoFocus>
                        No
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Grid>
    )
}
