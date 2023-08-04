
import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, CardContent, CardActionArea, IconButton, Button, Chip } from '@mui/material'


import { FC, useContext, useState } from 'react';
import { PostContext, UiContext } from '@/context';


import FactCheckIcon from '@mui/icons-material/FactCheck';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { ModalFicha } from '../modal';
import { Ficha } from './Ficha';

import CheckIcon from '@mui/icons-material/Check';
import { FileOpen, FileUploadTwoTone, Warning } from '@mui/icons-material';



interface Props {
    postulant: any;
    ses: any;
    index: number;
}


export const PostulantCard: FC<Props> = ({ postulant, index, ses }) => {


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
                        image={(postulant.image === null ? '/avatar.jpg' : `${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${postulant.image}`)}

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
                        {postulant.puntajes.map((e: any, index: number) => (
                            <Typography key={index}>Puntaje: {e.total}</Typography>

                        ))}
                    </CardContent>
                </CardActionArea>





                <CardActions >
                    <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={2}>
                        {postulant.puntajes.length > 0 ? (

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
                                <Button startIcon={<FileOpen />} variant='outlined' target='_blank' href={`${process.env.NEXT_PUBLIC_URL_DOCS_BUCKET}${ses}`}>
                                    Ver Sesión
                                </Button>)
                            //  ) : (
                            //     <Chip
                            //         icon={<Warning />}
                            //         label="No subió su sesión"
                            //         variant="outlined"
                            //         sx={{ width: '100%' }}
                            //         color={'warning'}

                            //     />
                            // )
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
