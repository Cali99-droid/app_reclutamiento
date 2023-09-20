import React, { FC, PropsWithChildren } from 'react';
import { Box, useMediaQuery, TextField, Divider, Typography, Paper, FormHelperText, FormControl, MenuItem, Select, InputLabel, SelectChangeEvent, Grid, styled } from '@mui/material';
import { useState, useRef } from 'react';
import moment from 'moment';
import { reclutApi } from '@/apies';
import { toast } from 'react-toastify';
import { CancelOutlined, Check, Save, Send } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';
import { IJob, IUser } from '@/interfaces';
import { useContext } from 'react';
import { PostContext } from '@/context';
import SaveIcon from '@mui/icons-material/Save';
import { red } from '@mui/material/colors';
import NumbersIcon from '@mui/icons-material/Numbers';
import PeopleIcon from '@mui/icons-material/People';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CategoryIcon from '@mui/icons-material/Category';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


interface ModalProps extends PropsWithChildren {

    convocatoria: IJob;
    postulantes: any[]


}

export const Cards: FC<ModalProps> = ({ convocatoria, postulantes }) => {

    const seleccionados = postulantes.filter(d => d.estado_postulante_id === 7)
    const contratados = postulantes.filter(d => d.estado_postulante_id === 7)
    const descartados = postulantes.filter(d => d.estado_postulante_id === 4)
    const router = useRouter();
    const { id } = router.query
    useEffect(() => {

        if ((convocatoria.vacantes - contratados.length) === 0) {

            cerrarConcocatoria()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postulantes])
    const refreshData = () => {
        router.replace(router.asPath)
    }
    const cerrarConcocatoria = async () => {
        try {

            await reclutApi.put('/admin/job', { id, status: 3 });
            refreshData()
            toast.info('La convocatoria se ha cerrado, porque ya no existen vacantes disponibles', { theme: "dark", })
        } catch (error) {

            console.log(error);
            alert('No se pudo cerrar la convocatoria');
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: 10

    }));
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} >
                <Item elevation={4}>

                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                        <NumbersIcon sx={{ fontSize: 60 }} color={'primary'} />
                        <Box>
                            <Typography color={'#454555'} variant="body1" > Vacantes</Typography>
                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{convocatoria.vacantes - contratados.length} </Typography>

                        </Box>
                    </Box>

                </Item>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                        <PeopleIcon sx={{ fontSize: 60 }} color={'primary'} />
                        <Box>  <Typography color={'#454555'} variant="body1" > Postulantes</Typography>
                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{postulantes.length} </Typography>

                        </Box>
                    </Box>
                </Item>
            </Grid>
            <Grid item xs={12} sm={4} >
                <Item elevation={4}>
                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'} >
                        <SpellcheckIcon sx={{ fontSize: 60 }} color={'primary'} />
                        <Box>
                            <Typography color={'#454555'} variant="body1" >Estado</Typography>
                            <Typography color={convocatoria.estado.id === 3 ? '#ED1C24' : '#454555'} fontWeight={'bold'} fontSize={28} textTransform={'capitalize'} >{convocatoria.estado.nombre} </Typography>
                            {/* <Select
                        value={convocatoria.estado.id}
                        label="Estado"
                        onChange={(e: SelectChangeEvent<number>) => onStatusJobUpdated(convocatoria.id, (e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )

                      >
                        <MenuItem value={1}> Abierta </MenuItem>
                        <MenuItem value={2}>En evaluación</MenuItem>
                        <MenuItem value={3}> Cerrada</MenuItem>

                      </Select> */}

                        </Box>
                    </Box>
                </Item>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                        <CategoryIcon sx={{ fontSize: 60 }} color={'primary'} />
                        <Box><Typography color={'#454555'} variant="body1" > Categoria</Typography>
                            <Typography color={'#454555'} fontWeight={'bold'} fontSize={28} textTransform={'capitalize'}>{convocatoria.categoria.nombre} </Typography>

                        </Box>
                    </Box>
                </Item>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                        <HowToRegIcon sx={{ fontSize: 60 }} color={'primary'} />
                        <Box>
                            <Typography color={'#454555'} variant="body1" > Seleccionados</Typography>
                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" textTransform={'uppercase'}>{seleccionados.length} </Typography>

                        </Box>
                    </Box>
                </Item>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                        <PersonRemoveAlt1Icon sx={{ fontSize: 60 }} color={'primary'} />
                        <Box>
                            <Typography color={'#454555'} variant="body1" > Descartados</Typography>
                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{descartados.length} </Typography>

                        </Box>
                    </Box>
                </Item>
            </Grid>

        </Grid>

    );
};

export default Cards;
