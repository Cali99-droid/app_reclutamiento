import React, { FC, PropsWithChildren } from 'react';
import { Box, Typography, Paper, styled, Breadcrumbs, Link } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';

import { IJob } from '@/interfaces';


import { useRouter } from 'next/router';


interface ModalProps extends PropsWithChildren {

    convocatoria: IJob;



}

export const NavegacionConvo: FC<ModalProps> = ({ convocatoria }) => {

    const router = useRouter();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: 10

    }));
    return (
        <Box mb={2}>
            <Item>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" onClick={() => router.push("/admin/convocatorias")} sx={{ cursor: 'pointer' }}>
                        Convocatorias
                    </Link>

                    <Typography fontWeight={'bold'} color="text.primary">{convocatoria.titulo}</Typography>
                </Breadcrumbs>
            </Item>

        </Box>

    );
};

export default NavegacionConvo;
