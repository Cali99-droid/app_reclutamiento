import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, useMediaQuery } from "@mui/material";


interface ModalProps extends PropsWithChildren {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const Modal: FC<ModalProps> = ({ title, children, open, handleClose, handleConfirm }) => {
  const matches = useMediaQuery('(min-width:600px)');
  return (

    <Dialog open={open} onClose={handleClose} >

      <DialogTitle >{title}</DialogTitle>
      <DialogContent  >
        <Box sx={matches ? { width: 400 } : { width: 250 }}>
          {children}
        </Box>


      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}  >
          Salir
        </Button>
        <Button onClick={handleConfirm} >
          Aceptar
        </Button>
      </DialogActions>


    </Dialog>

  );
};

export default Modal;
