import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, useMediaQuery, TextField, FormHelperText, InputAdornment } from '@mui/material';
import { useState, useRef, ChangeEvent } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { IUser } from '@/interfaces';
import { toast } from 'react-toastify';
import { reclutApi } from '@/apies';
import confetti from 'canvas-confetti';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';



interface ModalProps extends PropsWithChildren {


    handleClose: () => void;
    idPosConv: string | number;
    idPos: string | number;
    open: boolean;
}

export const ModalContrato: FC<ModalProps> = ({ idPosConv, idPos, handleClose, open }) => {
    const [monto, setMonto] = useState('');
    const [error, setError] = useState(false)
    const router = useRouter();
    const { id } = router.query
    const onMontoChange = (event: ChangeEvent<HTMLInputElement>) => {

        if (event.target.value.length <= 0 || event.target.value.length > 4) {
            setError(true)
        }


        setMonto(event.target.value);

    }


    const contratar = async () => {
        if (monto.length <= 0) {
            setError(true)
            toast.error('Agrega el monto acordado')
            return;
        }

        try {
            const { data } = await reclutApi.post(`/admin/contratar`, { idPosConv, monto, idPos });
            handleClose()
            confetti({
                particleCount: 300,
                spread: 70,
                origin: { y: 0.6 }
            });
            toast.success('🦄 Tenemos un nuevo contratado')

        } catch (error) {
            handleClose()
            if (axios.isAxiosError(error)) {
                handleClose()
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data.message,
                    footer: `<a href='${process.env.NEXT_PUBLIC_URL_BASE}admin/convocatorias/convocatoria/p/${idPos}?conv=${id}'>Revisar ficha del postulante</a>`
                })

            }
            console.log(error)
        }
    }
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Dialog open={open} onClose={handleClose} >

            <DialogTitle >Asignar Jurado</DialogTitle>
            <DialogContent  >
                <Box textAlign={'center'} mt={3}>
                    <TextField
                        type='number'
                        label="Monto Negociado"
                        id="outlined-start-adornment"
                        value={monto}
                        error={error}
                        onChange={onMontoChange}
                        sx={{ m: 1, width: '100%' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">S/</InputAdornment>,
                        }}
                        inputProps={{
                            max: 10000,
                            min: 0
                        }}
                    />
                    <FormHelperText>Debe ingresar el monto negociado con el postulante</FormHelperText>

                </Box>

            </DialogContent>
            <DialogActions>


                <Button variant='outlined' color='error' onClick={handleClose}   >
                    Cancelar
                </Button>
                <Button variant='outlined' onClick={contratar} >
                    Guardar
                </Button>
            </DialogActions>


        </Dialog>

    );
};

export default ModalContrato;



