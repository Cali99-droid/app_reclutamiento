import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, useMediaQuery, TextField, Divider, Typography, Paper, FormHelperText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useState, useRef } from 'react';
import moment from 'moment';
import { reclutApi } from '@/apies';
import { toast } from 'react-toastify';
import { Send } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';


interface ModalProps extends PropsWithChildren {
    // lastMessage: string;
    // fechaComennt: string;
    calificacion: any[];

    //   handleClose: () => void;
    //   handleConfirm: () => void;
}

export const BodyCalificacion: FC<ModalProps> = ({ calificacion }) => {



    return (
        <Box display={'flex'} gap={5} justifyContent={'start'}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Jurado</TableCell>
                            <TableCell align="right">Puntaje</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Comentario</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {calificacion.map((e: any, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{(e.user.persona.apellido_pat + ' ' + e.user.persona.apellido_mat + ' ' + e.user.persona.nombres).toLocaleUpperCase()}</TableCell>
                                <TableCell align="right">{e.total}/{e._count.puntaje_items * 10}</TableCell>

                                <TableCell align="right" component="th" scope="row">
                                    {e.user.rol.id === 5 ? 'Entrevista ' : 'Jurado'}
                                </TableCell>

                                <TableCell align="right">{e.comentario}</TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                {
                    calificacion.length === 0 && (
                        <Box padding={4}>
                            <Typography align="center">El postulante aún no tiene calificación</Typography>
                        </Box>


                    )
                }
            </TableContainer>


        </Box>
    );
};

export default BodyCalificacion;
