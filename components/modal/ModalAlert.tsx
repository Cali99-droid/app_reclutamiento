import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from "@mui/material";


interface ModalProps extends PropsWithChildren {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const ModalAlert: FC<ModalProps> = ({ title, children, open, handleClose, handleConfirm }) => {

  return (
    <Dialog open={open} sx={{ padding: 10 }}  >
      <DialogTitle color={'#324B4A'} fontWeight={'bold'}>{title}</DialogTitle>
      <DialogContent >{children}</DialogContent>
      <DialogActions>

        <Button onClick={handleConfirm}  >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAlert;
