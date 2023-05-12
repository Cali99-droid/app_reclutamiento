import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";


interface ModalProps extends PropsWithChildren {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const Modal: FC<ModalProps> = ({ title, children, open, handleClose, handleConfirm }) => {

  return (

    <Dialog open={open} onClose={handleClose}  >

      <DialogTitle >{title}</DialogTitle>
      <DialogContent  >

        {children}


      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}  >
          Cancelar
        </Button>
        <Button onClick={handleConfirm} >
          Aceptar
        </Button>
      </DialogActions>


    </Dialog>

  );
};

export default Modal;
