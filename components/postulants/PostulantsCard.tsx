
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
import { Modal, ModalFicha } from '../modal';
import { Ficha } from './Ficha';
import { persona } from '@prisma/client';
import { useSession } from 'next-auth/react';
import CheckIcon from '@mui/icons-material/Check';



interface Props {
    postulant: any;
    ses: any;
    index: number;
}


export const PostulantCard: FC<Props> = ({ postulant, index, ses }) => {

    const { data: session } = useSession()

    const { handleOpenClase } = useContext(PostContext)

    console.log(ses)

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
                        image={(postulant.image === null ? '/avatar.jpg' : `https://plataforma-virtual.s3.us-west-2.amazonaws.com/img/${postulant.image}`)}

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
                    <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={2}>
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
                        {
                            ses && (
                                <Button variant='outlined' target='_blank' href={`https://plataforma-virtual.s3.us-west-2.amazonaws.com/docs/${ses}`}>
                                    Ver Sesión
                                </Button>
                            )
                        }


                    </Box>





                </CardActions>


            </Card>


            <ModalFicha title={'Ficha'} open={open} handleClose={() => handleClose()} handleConfirm={() => handleClose()}>



                <Ficha postulante={pos} />



            </ModalFicha>

        </Grid>
    )
}
