import { FC } from 'react';

import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, Chip, CardContent, Button, CardActionArea, IconButton ,ListItemAvatar, ListItemText,ListItem} from '@mui/material'




import { IJob } from '@/interfaces';
import ShareIcon from '@mui/icons-material/Share';
import {ReqList} from './ReqList';
import NextLink from 'next/link';


interface Props {
    job: IJob;
}

export const JobCard: FC<Props> = ({ job }) => {



    
    return (
        <Grid item   
        xs={12} 
        sm={3}
        >
            <Card sx={{ maxWidth: 345 }}>
           
               <NextLink   href={`/convocatorias/${job.id}`} passHref prefetch={ false } legacyBehavior>

                <Link>
                    <CardActionArea>
                    <CardMedia
                        sx={{ height: 180 }}
                        image={`/jobs/${job.img}.jpg`}
                        title={job.titulo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {job.titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {job.descripcion}
                        </Typography>
                        
                        <ReqList job={job} />
                                        
                    
                        {/* <Box mt={1}>
                            <Chip label={`${job.categoria}`} color="success" variant="outlined" />
                        </Box> */}
                    </CardContent>  
                    </CardActionArea>
                    <CardActions sx={{display:'flex', justifyContent:'flex-end'}}>
                        
                        <IconButton aria-label="share" >
                                <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Link>
                
                </NextLink>
             </Card>

        </Grid>
    )
}
