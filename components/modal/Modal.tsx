import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, useMediaQuery } from "@mui/material";


interface ModalProps extends PropsWithChildren {
  title: string;
  open: boolean;
  dis?: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const Modal: FC<ModalProps> = ({ title, children, open, handleClose, handleConfirm, dis }) => {
  const matches = useMediaQuery('(min-width:600px)');
  return (

    <Dialog open={open} onClose={handleClose} >

      <DialogTitle >{title}</DialogTitle>
      <DialogContent  >
        <Box sx={matches ? { width: 500 } : { width: 250 }}>
          {children}
        </Box>


      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={dis} >
          Cancelar
        </Button>
        <Button onClick={handleConfirm} disabled={dis}>
          Aceptar
        </Button>
      </DialogActions>


    </Dialog>

  );
};

export default Modal;
