
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



interface Props {
    postulant: IPostulant;
    index: number;
}


export const PostulantCard: FC<Props> = ({ postulant, index }) => {


    const { handleOpenClase } = useContext(PostContext)

    const [open, setOpen] = useState(false)
    const [pos, setPos] = useState<any>();
    console.log(pos)
    const handleOpen = (pos: any) => {
        setOpen(true);
        setPos(pos)
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
                    </CardContent>
                </CardActionArea>





                <CardActions >

                    <Chip
                        icon={<FactCheckIcon />}
                        label="Evaluar"
                        variant="outlined"
                        clickable
                        sx={{ width: '100%' }}
                        color={'primary'}
                        onClick={() => { handleOpenClase(postulant.id) }}
                    />

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


            <Modal title={'Ficha'} open={open} handleClose={function (): void {
                throw new Error('Function not implemented.');
            }} handleConfirm={function (): void {
                throw new Error('Function not implemented.');
            }}>

                <Ficha grados={[]} postulante={pos} estudios={[]} cargos={[]} inves={[]} capa={[]} reco={[]} tecno={[]} aficion={[]} />


            </Modal>

        </Grid>
    )
}
