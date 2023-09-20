import React, { FC, PropsWithChildren } from 'react';
import { Box, useMediaQuery, TextField, Divider, Typography, Paper, FormHelperText, FormControl, MenuItem, Select, InputLabel, SelectChangeEvent, Grid, styled, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useState, useRef } from 'react';
import moment from 'moment';
import { reclutApi } from '@/apies';
import { toast } from 'react-toastify';
import { CancelOutlined, Check, Save, Send } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from 'axios';
import { IJob, IUser } from '@/interfaces';
import { useContext } from 'react';
import { PostContext } from '@/context';
import SaveIcon from '@mui/icons-material/Save';
import { red } from '@mui/material/colors';
import NumbersIcon from '@mui/icons-material/Numbers';
import PeopleIcon from '@mui/icons-material/People';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CategoryIcon from '@mui/icons-material/Category';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { GridCloseIcon } from '@mui/x-data-grid';


interface ModalProps extends PropsWithChildren {



    handleOpen: () => void;

}

export const Jurados: FC<ModalProps> = ({ handleOpen }) => {

    const { juradosAsignados, deleteJurado, refreshJurados } = useContext(PostContext);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: 10

    }));
    return (
        <Box >
            <Item elevation={4}>
                <Button onClick={handleOpen}>Asignar jurados</Button>
                <List dense>
                    <Typography fontWeight={'bold'}>Jurados</Typography>
                    {
                        juradosAsignados.map((j) =>
                        (
                            <ListItem key={j.id}>
                                <ListItemText
                                    primary={`${j.user.persona.nombres + ' ' + j.user.persona.apellido_pat + ' ' + j.user.persona.apellido_mat}`}
                                />
                                <IconButton size="small" aria-label="delete" onClick={() => deleteJurado(j.id)}>
                                    <GridCloseIcon fontSize="inherit" />
                                </IconButton>
                            </ListItem>
                        )
                        )
                    }
                </List>
            </Item>

        </Box>

    );
};

export default Jurados;
