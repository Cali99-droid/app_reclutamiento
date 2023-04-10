
import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, CardContent, CardActionArea, IconButton } from '@mui/material'

import { IPostulant } from '@/interfaces';


import NextLink from 'next/link';
import { FC, useContext } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PostContext } from '@/context';


interface Props {
    postulant: IPostulant;
}


export const PostulantCard: FC<Props> = ({ postulant }) => {

    const{advancePhase,backPhase} = useContext(PostContext)
    return (
        <Grid item   
        xs={12} 
        sm={3}
        > 
            <Card sx={{ maxWidth: 345 }}>      
            <NextLink   href={`/`} passHref prefetch={ false } legacyBehavior>

                <Link>
                    <CardActionArea>
                    <CardMedia
                        sx={{ height: 250 }}
                        image={`/postulants/${postulant.img}.jpg`}
                        // title={job.titulo}
                    />
                    <CardContent>
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
                    <IconButton 
                    aria-label="remove to favorites"
                    onClick={()=>backPhase(postulant)}
                    
                    >
                        <RemoveCircleIcon fontSize="large" />
                    </IconButton>
                    <IconButton aria-label="add to favorites" onClick={()=>advancePhase(postulant)}>
                        <AddCircleIcon fontSize="large" color="secondary"/>
                    </IconButton>
                    
                    </CardActions>
                
                
            </Card>
        </Grid>
    )
}
