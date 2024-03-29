import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';


import { LoginOutlined, Quiz } from "@mui/icons-material"
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { AuthContext } from '@/context';
import FactCheckIcon from '@mui/icons-material/FactCheck';


const categories = [
    {
        id: 'Administrador',
        hijos: [
            {
                id: 'Dashboard',
                icon: <DashboardOutlinedIcon />,

                dir: '/admin/dashboard'
            },
            {
                id: 'Convocatorias',
                icon: <PublicIcon />,
                active: true,
                dir: '/admin/convocatorias'
            },
            ,
            {
                id: 'Evaluaciones',
                icon: <Quiz />,
                active: true,
                dir: '/admin/evaluaciones'
            },
            {
                id: 'Usuarios',
                icon: <GroupIcon />,
                active: false,
                dir: '/admin/users'
            }
        ],
    },
    {
        id: 'Otros',
        hijos: [


            {
                id: 'Config', icon: <SettingsIcon />, active: true,
                dir: '/perfil'
            }


        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};



export default function Navigator(props: DrawerProps) {
    const { ...other } = props;
    const [option, setOption] = useState(categories)
    const { isLoggedIn, logout, user } = useContext(AuthContext);
    const { asPath, push } = useRouter();

    const navigateTo = (url: string, id: string) => {
        const optionUpdate = categories.map(c => ({
            ...c,
            active: id === c.id ? true : false
        }))
        setOption(optionUpdate)
        push(url);

    }
    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding >
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    <Box display='flex' justifyContent={'end'} alignItems={'center'} mt={4} mb={3}>
                        <Typography variant='h5' fontWeight={'bold'} >AE  </Typography>
                        <Typography variant='h6' sx={{ ml: 0.5 }} >| Empleos</Typography>

                    </Box>
                </ListItem>
                <ListItem disablePadding >
                    <ListItemButton sx={{ ...item, }} onClick={() => push('/')}>

                        <ListItemIcon sx={{ marginRight: 1 }}><HomeIcon /></ListItemIcon>
                        <ListItemText>Ir a inicio</ListItemText>
                    </ListItemButton>

                </ListItem>

                {user?.rol.name === 'admin' || user?.rol.name === 'jefe' || user?.rol.name === 'asistente' ? (
                    option.map(({ id, hijos }) => (
                        <Box key={id} sx={{ bgcolor: '#101F33' }} >
                            <ListItem sx={{ py: 2, px: 3 }}>
                                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                            </ListItem>
                            {hijos.map((h) => (
                                <ListItem disablePadding key={h!.id}>
                                    <ListItemButton
                                        selected={asPath.includes(`${h!.dir}`)}
                                        sx={item}
                                        onClick={() => navigateTo(`${h!.dir}`, h!.id)}>
                                        <ListItemIcon sx={{ marginRight: 1 }}>{h!.icon}</ListItemIcon>
                                        <ListItemText>{h!.id} </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    ))) : (
                    <></>
                )}
                {isLoggedIn && (user?.rol.name === 'jurado1' || user?.rol.name === 'jurado2') && (
                    <ListItem sx={{ ...item, ...itemCategory }}>
                        <ListItemButton
                            selected={true}
                            onClick={() => push('/jurado')}
                        >
                            <ListItemIcon sx={{ marginRight: 1 }}>
                                <FactCheckIcon />
                            </ListItemIcon>
                            <ListItemText>Evaluar Docente</ListItemText>
                        </ListItemButton>
                    </ListItem>
                )}

                <ListItem disablePadding  >
                    <ListItemButton
                        sx={item}
                        onClick={logout}>
                        <ListItemIcon sx={{ marginRight: 1 }}><LoginOutlined /></ListItemIcon>
                        <ListItemText>Salir</ListItemText>
                    </ListItemButton>
                </ListItem>

            </List>
        </Drawer>
    );
}