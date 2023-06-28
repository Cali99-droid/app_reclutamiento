import { useContext, useState } from 'react';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, BorderColor, CategoryOutlined, Checklist, ConfirmationNumberOutlined, EscalatorWarningOutlined, LoginOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

import { AuthContext, UiContext } from '../../context';
import { useRouter } from 'next/router';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import FilePresentIcon from '@mui/icons-material/FilePresent';




export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
    const { isLoggedIn, logout, user } = useContext(AuthContext);


    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }


    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>



                    {
                        isLoggedIn && user?.rol.name === 'postulante' && (
                            <>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={user?.persona?.nombres} />
                                </ListItemButton>

                            </>
                        )
                    }


                    <ListItemButton
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/')}
                    >
                        <ListItemIcon>
                            <HomeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Inicio'} />
                    </ListItemButton>

                    <ListItemButton
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/convocatorias')}
                    >
                        <ListItemIcon>
                            <DashboardOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Convocatorias'} />
                    </ListItemButton>

                    <ListItemButton
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/docentes')}
                    >
                        <ListItemIcon>
                            <AssignmentIndOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Docentes'} />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/beneficios')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Beneficios'} />
                    </ListItemButton>




                    <Divider />
                    {
                        isLoggedIn
                            ? (<>
                                <ListItemButton onClick={() => navigateTo('/postulant/ficha')}>
                                    <ListItemIcon>
                                        <FilePresentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Mi Ficha'} />
                                </ListItemButton>

                                <ListItemButton onClick={() => navigateTo('/postulant')} >
                                    <ListItemIcon>
                                        <BorderColor />
                                    </ListItemIcon>
                                    <ListItemText primary={'Actualizar mi Ficha'} />
                                </ListItemButton>
                                <ListItemButton onClick={() => navigateTo('/postulant/postulaciones')} >
                                    <ListItemIcon>
                                        <Checklist />
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Postulaciones'} />
                                </ListItemButton>
                                <ListItemButton onClick={logout}>
                                    <ListItemIcon>
                                        <LoginOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Salir'} />
                                </ListItemButton>
                            </>

                            )
                            : (
                                <ListItemButton
                                    onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                                >
                                    <ListItemIcon>
                                        <VpnKeyOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Ingresar'} />
                                </ListItemButton>
                            )
                    }
                </List>
            </Box>
        </Drawer>
    )
}