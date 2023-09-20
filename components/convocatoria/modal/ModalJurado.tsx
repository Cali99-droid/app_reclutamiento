import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, useMediaQuery, TextField, Divider, Typography, Paper, FormHelperText, FormControl, MenuItem, Select, InputLabel, SelectChangeEvent } from '@mui/material';
import { useState, useRef } from 'react';
import moment from 'moment';
import { reclutApi } from '@/apies';
import { toast } from 'react-toastify';
import { CancelOutlined, Check, Save, Send } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';
import { IUser } from '@/interfaces';
import { useContext } from 'react';
import { PostContext } from '@/context';
import SaveIcon from '@mui/icons-material/Save';
import { red } from '@mui/material/colors';


interface ModalProps extends PropsWithChildren {

    jurados: IUser[];
    open: boolean;
    handleClose: () => void;


}

export const ModalJurado: FC<ModalProps> = ({ jurados, open, handleClose }) => {
    const [jurado, setJurado] = useState('')
    const onJuradoChange = (event: SelectChangeEvent<string>) => {
        setJurado(event.target.value);

    }
    const asignarJurado = async () => {

        if (jurado) {
            try {
                const resp = await addNewJurado(jurado);
                // toast.success('Asignado correctamente');
                if (resp.err) {
                    toast.info(resp.message)
                } else {
                    toast.success(resp.message)
                }


            } catch (error) {
                console.log(error)
            }


        } else {
            toast.error('Seleccione una opción')
            return
        }


        // refreshJurados()

    }
    const { addNewJurado } = useContext(PostContext);
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Dialog open={open} onClose={handleClose} >

            <DialogTitle >Asignar Jurado</DialogTitle>
            <DialogContent  >
                <Box sx={matches ? { width: 500 } : { width: 300 }}>
                    <Box mt={2}>
                        <FormControl fullWidth >
                            <InputLabel id="gradoId">Seleccione</InputLabel>
                            <Select
                                labelId="gradoId"
                                id="gradoId"
                                label="Requisito"
                                onChange={onJuradoChange}
                                value={jurado}

                            >

                                <MenuItem value={0} disabled></MenuItem>
                                {
                                    jurados.map(jurado => (
                                        <MenuItem key={jurado.id} value={jurado.id}>{jurado.persona.nombres.toLocaleUpperCase() + ' ' + jurado.persona.apellido_pat.toLocaleUpperCase() + ' ' + jurado.persona.apellido_mat.toLocaleUpperCase()}</MenuItem>
                                    ))
                                }


                            </Select>

                        </FormControl>
                    </Box>
                </Box>


            </DialogContent>
            <DialogActions>


                <Button variant='outlined' color='error' onClick={handleClose}   >
                    Cancelar
                </Button>
                <Button variant='outlined' onClick={asignarJurado} >
                    Guardar
                </Button>
            </DialogActions>


        </Dialog>








    );
};

export default ModalJurado;
