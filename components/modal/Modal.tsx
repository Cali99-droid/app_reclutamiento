import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from "@mui/material";


interface ModalProps extends PropsWithChildren {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const Modal: FC<ModalProps> = ({ title, children, open, handleClose, handleConfirm }) => {

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button  onClick={handleClose} color='primary'  sx={{textTransform:'uppercase', color:'#FFF'}}>
          Cancelar
        </Button>
        <Button  onClick={handleConfirm} color='primary'  sx={{textTransform:'uppercase', color:'#FFF'}}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
