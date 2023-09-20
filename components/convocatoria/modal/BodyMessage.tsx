import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, useMediaQuery, TextField, Divider, Typography, Paper, FormHelperText } from '@mui/material';
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
    mgs: any[];
    idPosConv: string | number;
    phone: string | number;
    //   handleClose: () => void;
    //   handleConfirm: () => void;
}

export const BodyMessage: FC<ModalProps> = ({ mgs, idPosConv, phone }) => {
    const matches = useMediaQuery('(min-width:600px)');
    const [message, setMessage] = useState('')
    const contentRef = useRef<HTMLDivElement | null>(null);
    const formatTel = `51${phone}`;

    const sendMessage = async () => {

        try {

            const { data } = await reclutApi.post(`/admin/postulantes/1`, { idPosConv, message });
            const resp = await reclutApi.post(`https://whatapi.colegioae.edu.pe/api/messages/send`, { "number": formatTel, "body": message }, {
                headers: {
                    Authorization: `Bearer SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
                    'Content-Type': 'application/json',
                },
            });

            mgs.unshift(data.msg)
            // setMgs([...mgs, ])

            // const url = `https://api.whatsapp.com/send?phone=+51${encodeURIComponent(phone!)}&text=${encodeURIComponent(message)}`;
            // const newTab = window.open(url, '_blank');
            // newTab!.focus();
            toast.success('🦄 Mensaje enviado correctamente!')
            setMessage('');
            // const response = await axios.get(url, config);
            // console.log('Message sent:', response.data);
        } catch (error) {
            console.error('Error sending message:', error);

            if (axios.isAxiosError(error)) {
                // setShowError(true);
                // setErrorMessage(error.response?.data.message!);
                // setTimeout(() => setShowError(false), 3000);
                // setIsSaving(false)

                toast.error('Error sending message:' + ' ' + error.response?.data.error)

            }

        }
    };
    return (



        <Box mt={1}>

            <TextField onChange={(e) => setMessage(e.target.value)} value={message} multiline rows={3} fullWidth id="outlined-basic" label="Agregar Mensaje" variant="outlined" sx={{ mb: 2 }} />
            <FormHelperText>* Este mensaje se enviará a través la conexión Colegio AE de whaticket.colegioae.edu.pe, si quiere ver el mensaje en whatsapp asegurece de tener el telefono de dicha conexión. </FormHelperText>
            <Box display={'flex'} justifyContent={'end'}>
                <Button sx={{ mb: 1 }} variant='contained' endIcon={<Send />} onClick={sendMessage} >Enviar</Button>
            </Box>
            <Divider />

            <Box mt={2} mb={2}>
                <Typography variant='body1' fontWeight={'bold'}>Últimos mensajes:</Typography>
                <Box height={280} overflow={'auto'} padding={1} bgcolor={'#FAFAFA'} ref={contentRef}>
                    {mgs.map((m) => (
                        <Paper key={m.id}>
                            <Box padding={2} mt={1} >
                                <Typography >{m.contenido}</Typography>
                                <Typography variant='body2' color={'gray'}>{m.fecha ? (moment(m.fecha).fromNow()) : 'No hay mensajes'}</Typography>
                            </Box>
                        </Paper>
                    ))
                    }
                </Box>

            </Box>

        </Box>




    );
};

export default BodyMessage;
