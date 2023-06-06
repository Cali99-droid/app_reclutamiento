
import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, CardContent, CardActionArea, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Chip } from '@mui/material'

import { IPostulant } from '@/interfaces';


import NextLink from 'next/link';
import { FC, useContext, useState } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PostContext, UiContext } from '@/context';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




import FactCheckIcon from '@mui/icons-material/FactCheck';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { Modal } from '../modal';
import { Ficha } from './Ficha';
import { persona } from '@prisma/client';
import { useSession } from 'next-auth/react';
import CheckIcon from '@mui/icons-material/Check';



interface Props {
    postulant: any;
    index: number;
}


export const PostulantCard: FC<Props> = ({ postulant, index }) => {
    console.log(postulant)
    const { data: session } = useSession()

    const { handleOpenClase } = useContext(PostContext)



    const [open, setOpen] = useState(false)
    const [pos, setPos] = useState<any>(postulant);

    const handleOpen = (pos: any) => {
        setOpen(true);
        setPos(pos)

    }
    const handleClose = () => {
        setOpen(false);

    }
    return (
        <Grid item
            xs={12}
            sm={3}
        >
            <Card sx={{ maxWidth: 345 }} >


                <CardActionArea >
                    <CardMedia
                        sx={{ height: 220 }}
                        image={(postulant.image === null ? '/avatar.jpg' : postulant.image)}

                    />
                    <CardContent>

                        <Typography fontWeight={'bold'} color={'#FFBC58'}># {index + 1}</Typography>

                        <Typography fontWeight={'bold'} >{postulant.persona.nombres + ' ' + postulant.persona.apellido_pat + ' ' + postulant.persona.apellido_mat}</Typography>
                        {/* <Box mt={1}>
                            <Chip label={`${job.categoria}`} color="success" variant="outlined" />
                        </Box> */}
                        {
                            // puntaje.map(p =>(
                            //     p.
                            // ))
                        }
                        {postulant.evaluacion_x_postulante.map((e: any, index: number) => (
                            <Typography key={index}>Puntaje: {e.puntaje}</Typography>

                        ))}
                    </CardContent>
                </CardActionArea>





                <CardActions >
                    {postulant.evaluacion_x_postulante.length > 0 ? (

                        <Chip
                            icon={<CheckIcon />}
                            label="Evaluado"
                            variant="outlined"
                            // clickable

                            sx={{ width: '100%' }}
                            color={'warning'}
                        // onClick={() => { handleOpenClase(postulant.id) }}
                        />
                    ) : (
                        <Chip
                            icon={<FactCheckIcon />}
                            label="Evaluar"
                            variant="outlined"
                            clickable

                            sx={{ width: '100%' }}
                            color={'primary'}
                            onClick={() => { handleOpenClase(postulant.id) }}
                        />
                    )}


                    <Chip
                        icon={<FilePresentIcon />}
                        label="Ver ficha"
                        variant="outlined"
                        clickable
                        sx={{ width: '100%' }}
                        color={'secondary'}
                        onClick={() => { handleOpen(postulant) }}
                    />


                    {/* <IconButton

                        aria-label="evaluar"
                    // 

                    >
                        < FactCheckIcon />
                    </IconButton> */}



                </CardActions>


            </Card>


            <Modal title={'Ficha'} open={open} handleClose={() => handleClose()} handleConfirm={() => handleClose()}>



                <Ficha postulante={pos} />



            </Modal>

        </Grid>
    )
}
