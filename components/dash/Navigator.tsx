
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { useRouter } from 'next/router';
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, LoginOutlined, SearchOutlined, SupervisedUserCircle, SupervisedUserCircleOutlined, VpnKeyOutlined } from "@mui/icons-material"
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { AuthContext } from '@/context';
import QuizIcon from '@mui/icons-material/Quiz';
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
            {
                id: 'Evaluaciones',
                icon: <QuizIcon />,
                active: false,
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
                id: 'Config', icon: <SettingsIcon />, active: false,
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


const validRolJurados = ['jurado1', 'jurado2'];
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
                    <Box display='flex' justifyContent={'end'} alignItems={'center'} mt={4}>
                        <Typography variant='h5' fontWeight={'bold'} >AE  </Typography>
                        <Typography variant='h6' sx={{ ml: 0.5 }} >| Empleos</Typography>

                    </Box>
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Ir a inicio</ListItemText>
                </ListItem>
                {user?.rol.name === 'admin' && (
                    option.map(({ id, hijos }) => (
                        <Box key={id} sx={{ bgcolor: '#7268D0' }} >
                            <ListItem sx={{ py: 2, px: 3 }}>
                                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                            </ListItem>
                            {hijos.map(({ id: childId, icon, active, dir }) => (
                                <ListItem disablePadding key={childId}>
                                    <ListItemButton
                                        selected={asPath.includes(`${dir}`)}
                                        sx={item}
                                        onClick={() => navigateTo(`${dir}`, childId)}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{childId}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    )))}
                {isLoggedIn && (user?.rol.name === 'jurado1' || user?.rol.name === 'jurado2') && (
                    <ListItem sx={{ ...item, ...itemCategory }}>
                        <ListItemButton
                            selected={true}
                            onClick={() => push('/jurado')}
                        >
                            <ListItemIcon>
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
                        <ListItemIcon><LoginOutlined /></ListItemIcon>
                        <ListItemText>Salir</ListItemText>
                    </ListItemButton>

                </ListItem>

            </List>
        </Drawer>
    );
}