import { useContext, useState } from 'react';

import { Box,  Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material"
import { EscalatorWarningOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

 import { UiContext } from '../../context';
import { useRouter } from 'next/router';



import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import KeyIcon from '@mui/icons-material/Key';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
export const SideMenu = () => {

    const router = useRouter();
     const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    // const { user, isLoggedIn, logout } = useContext(  AuthContext );

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

                {/* {
                    isLoggedIn && (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                        </>
                    )
                } */}

                <ListItemButton onClick={ () => navigateTo('/auth/login') }>
                            <ListItemIcon>
                            <KeyIcon/>
                            </ListItemIcon>
                             <ListItemText primary={'Ingresar'} />
                </ListItemButton>
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
                    // isLoggedIn 
                    // ? (
                    //     <ListItem button onClick={ logout }>
                    //         <ListItemIcon>
                    //             <LoginOutlined/>
                    //         </ListItemIcon>
                    //         <ListItemText primary={'Salir'} />
                    //     </ListItem>
                    // )
                    // : (
                    //     <ListItem 
                    //         button
                    //         onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }
                    //     >
                    //         <ListItemIcon>
                    //             <VpnKeyOutlined/>
                    //         </ListItemIcon>
                    //         <ListItemText primary={'Ingresar'} />
                    //     </ListItem>
                    // )
                }



                {/* Admin */}
                {
                    // user?.role === 'admin' && (
                    //     <>
                    //         <Divider />
                    //         <ListSubheader>Admin Panel</ListSubheader>

                    //         <ListItem button>
                    //             <ListItemIcon>
                    //                 <CategoryOutlined/>
                    //             </ListItemIcon>
                    //             <ListItemText primary={'Productos'} />
                    //         </ListItem>
                    //         <ListItem button>
                    //             <ListItemIcon>
                    //                 <ConfirmationNumberOutlined/>
                    //             </ListItemIcon>
                    //             <ListItemText primary={'Ordenes'} />
                    //         </ListItem>

                    //         <ListItem button>
                    //             <ListItemIcon>
                    //                 <AdminPanelSettings/>
                    //             </ListItemIcon>
                    //             <ListItemText primary={'Usuarios'} />
                    //         </ListItem>                        
                    //     </>
                    // )
                }
            </List>
        </Box>
    </Drawer>
  )
}