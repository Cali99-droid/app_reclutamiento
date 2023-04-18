import { useContext, useState } from 'react';

import { Box,  Divider,  Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, LoginOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

import { AuthContext, UiContext } from '../../context';
import { useRouter } from 'next/router';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import FilePresentIcon from '@mui/icons-material/FilePresent';




export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    
    const { isLoggedIn,logout,user } = useContext(  AuthContext );

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${ searchTerm }`);
    }

    
    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                 {
                    isLoggedIn && (
                        <>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/postulant') }>
                                <ListItemIcon>
                                    <FilePresentIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Datos'} />
                            </ListItemButton>

                            <ListItemButton  >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Postulaciones'} />
                            </ListItemButton>
                        </>
                    )
                } 

               
                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ () => navigateTo('/') }
                >
                    <ListItemIcon>
                        <HomeOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Inicio'} />
                </ListItemButton>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/convocatorias') }
                >
                    <ListItemIcon>
                        <DashboardOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Convocatorias'} />
                </ListItemButton>

                <ListItemButton
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/docentes') }
                >
                    <ListItemIcon>
                        <AssignmentIndOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Docentes'} />
                </ListItemButton>
                <ListItemButton
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/beneficios') }
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Beneficios'} />
                </ListItemButton>
              
               
                {
                    isLoggedIn 
                    ? (
                        <ListItemButton onClick={ logout }>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItemButton>
                    )
                    : (
                        <ListItemButton                             
                            onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }
                        >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItemButton>
                    )
                }



                {/* Admin */}
                {
                    user?.rol.name === 'admin' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItemButton 
                             onClick={ () => navigateTo(`/admin/convocatorias?p=${ router.asPath }`)}
                            >
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Convocatorias'} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItemButton>                        
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}