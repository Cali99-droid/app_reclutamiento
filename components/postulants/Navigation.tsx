
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GetServerSideProps, NextPage } from 'next';
import { Ficha } from './Ficha';

import PostulantPage from '@/pages/postulant';
import PostulacionesPage from '@/pages/postulant/postulaciones';
import { ArticleOutlined, BorderColor, Checklist } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import handler from '../../pages/api/admin/evaluaciones/index';

interface Props {

    // grados: IGrado[]
    // user: any
    postulante: any

    convocatorias: any[]

}

export const Navigation: NextPage<Props> = ({ postulante, convocatorias }) => {
    const [value, setValue] = useState(0);
    const router = useRouter();


    useEffect(() => {
        if (router.query.val) {
            const seleccion = parseInt(router.query.val.toString());
            if (seleccion && seleccion <= 2 && seleccion >= 0) {
                setValue(seleccion)
            }
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleChange = (newValue: number) => {
        setValue(newValue);
        router.replace(router.asPath)
    }


    return (
        <Box sx={{ width: '90%', margin: 'auto' }} >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => handleChange(newValue)}
                sx={{ backgroundColor: '#F1F1E6' }}
            >
                <BottomNavigationAction onChange={() => console.log('cambiando...')} label="Actualizar Mi Ficha" icon={<EditIcon />} />
                <BottomNavigationAction label="Mi Ficha" icon={<ArticleOutlined />} />
                <BottomNavigationAction label="Mis Postulaciones" icon={<Checklist />} />

            </BottomNavigation>
            <Box display={value === 0 ? 'block' : 'none'}>
                <PostulantPage postulante={postulante} />
            </Box>
            <Box display={value === 1 ? 'block' : 'none'}>
                <Ficha postulante={postulante} />

            </Box>
            <Box display={value === 2 ? 'block' : 'none'}>
                <PostulacionesPage convocatorias={convocatorias} />
            </Box>
        </Box>
    );
}

