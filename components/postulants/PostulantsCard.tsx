
import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, Chip, CardContent, Button, CardActionArea, IconButton } from '@mui/material'


import { IPostulant } from '@/interfaces';
import ShareIcon from '@mui/icons-material/Share';

import NextLink from 'next/link';
import { FC } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';


interface Props {
    postulant: IPostulant;
}

export const PostulantCard: FC<Props> = ({ postulant }) => {
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
                    <CardActions sx={{display:'flex', justifyContent:'flex-end'}}>
                    <IconButton aria-label="add to favorites">
                        <RemoveCircleIcon fontSize="large" />
                    </IconButton>
                    <IconButton aria-label="add to favorites">
                        <AddCircleIcon fontSize="large" color="secondary"/>
                    </IconButton>
                    
                    </CardActions>
                </Link>
                
                </NextLink>
            </Card>
        </Grid>
    )
}
