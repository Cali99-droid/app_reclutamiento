import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, useMediaQuery } from "@mui/material";


interface ModalProps extends PropsWithChildren {
    title: string;
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

export const ModalFicha: FC<ModalProps> = ({ title, children, open, handleClose, handleConfirm }) => {
    const matches = useMediaQuery('(min-width:600px)');
    return (

        <Dialog open={open} onClose={handleClose} maxWidth='lg'>

            <DialogTitle >{title}</DialogTitle>
            <DialogContent  >

                {children}



            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' >
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} >
                    Aceptar
                </Button>
            </DialogActions>


        </Dialog>

    );
};

export default ModalFicha;
