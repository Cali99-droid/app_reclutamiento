import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, FormControlLabel, RadioGroup, FormLabel, FormControl, FormHelperText, Radio } from "@mui/material";


interface ModalProps extends PropsWithChildren {
    title: string;
    open: boolean;
    handleClose: () => void;

}

export const ModalEntrevista: FC<ModalProps> = ({ title, children, open, handleClose }) => {

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            {children}
        </Dialog>
    );
};

export default ModalEntrevista;
