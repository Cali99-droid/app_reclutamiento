import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Avatar, Box, Button, Divider, IconButton, Link, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, useScrollTrigger } from '@mui/material';
import { ArticleOutlined, BorderColor, Checklist, FileCopyOutlined, Key, Logout } from '@mui/icons-material';

import { AuthContext, UiContext } from '@/context';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MenuIcon from '@mui/icons-material/Menu';

import Image from 'next/image';

import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
}

function ElevationScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}




export const NavBar = () => {

    const props: Props = {
        window: undefined,
        children: <></>

    };
    const { asPath, push } = useRouter();

    const { toggleSideMenu } = useContext(UiContext);
    const [searchTerm, setSearchTerm] = useState('');

    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const { isLoggedIn, user, logout } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const esJurado = () => {
        if (user?.rol_id === 3 || user?.rol_id === 4) {
            return true;
        }
        return false;
    }
    const handleMenuUser = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorEl(null);
    };
    const MenuPost = () => {


        return (
            <>
                <MenuItem onClick={() => push('/postulant/ficha')} >
                    <ListItemIcon>
                        <ArticleOutlined fontSize="small" />
                    </ListItemIcon>
                    Ver mi ficha
                </MenuItem>

            </>
        );
    };
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <ElevationScroll {...props}>
            <AppBar sx={{ height: '140px' }} >
                <Toolbar  >
                    <Box flex={1} sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} />
                    <NextLink href='/' passHref legacyBehavior>

                        <Link >
                            {
                                matches ? (<Image priority src={"/img/logoxs.png"} alt={"imagen logo colegio albert einstein"} width={250} height={67} />) : (<Image priority src={"/img/logsm.png"} alt={"imagen trabajo"} width={50} height={50} />)
                            }

                        </Link>

                    </NextLink>
                    <Box flex={.5} />

                    <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                        gap={'2rem'} >
                        <NextLink href='/' passHref legacyBehavior>
                            <Link
                                color={asPath === '/' ? '#0045aa' : '#767687'}
                                sx={{ padding: '1.5rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}
                                fontWeight={asPath === '/' ? 600 : 500}

                            >
                                Inicio
                            </Link>
                        </NextLink>
                        <NextLink href='/convocatorias' passHref legacyBehavior>
                            <Link
                                color={asPath === '/convocatorias' ? '#0045aa' : '#767687'}
                                sx={{ padding: '1.5rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}
                                fontWeight={asPath === '/convocatorias' ? 600 : 500}
                            >
                                Convocatorias
                            </Link>

                        </NextLink>
                        {/* <NextLink href='#nosotros' passHref legacyBehavior>
                            <Link
                                color={asPath === '/convocatorias' ? '#0045aa' : '#767687'}
                                sx={{ padding: '1.5rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}
                                fontWeight={asPath === '/convocatorias' ? 600 : 500}
                            >
                                Nosotros
                            </Link>

                        </NextLink> */}
                        {/* <NextLink href='/beneficios' passHref legacyBehavior>
                            <Link
                                color={asPath === '/beneficios' ? '#0045aa' : '#767687'}
                                sx={{ padding: '1.5rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}
                                fontWeight={asPath === '/beneficios' ? 600 : 500}

                            >
                                Beneficios
                            </Link>
                        </NextLink>
                        <NextLink href='/docentes' passHref legacyBehavior>
                            <Link
                                color={asPath === '/docentes' ? '#0045aa' : '#767687'}
                                sx={{ padding: '1.5rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}
                                fontWeight={asPath === '/docentes' ? 600 : 500}
                            >
                                ¿Cómo Postular?
                            </Link>
                        </NextLink> */}
                        {/* {isLoggedIn && user?.rol.name === 'postulante' && (
                            <NextLink href='/mis-datos' passHref legacyBehavior>
                                <Link
                                    color={asPath === '/mis-datos' ? '#0045aa' : '#767687'}
                                    sx={{ padding: '1.5rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}
                                    fontWeight={asPath === '/docentes' ? 600 : 500}
                                >
                                    Mis Datos
                                </Link>
                            </NextLink>
                        )} */}

                    </Box>



                    <Box flex={.5} />


                    {/* Pantallas pantallas grandes */}
                    {user?.rol.name === 'admin' || user?.rol.name === 'jefe' || user?.rol.name === 'asistente' ? (
                        <Box>
                            <Button size={matches ? 'medium' : 'small'} variant='contained' sx={{ background: 'linear-gradient(to right, #0045aa 0%,#4565d0 31%,#7087f7 64%,#7db9e8 100%);' }} onClick={() => push('/admin/convocatorias')}>Administrar</Button>
                        </Box>
                    ) : (
                        <></>
                    )}
                    {!isLoggedIn && (
                        <Box sx={{ padding: 1 }}>
                            <Button size={matches ? 'medium' : 'small'} variant='contained' sx={{ background: 'linear-gradient(to right, #0045aa 0%,#4565d0 31%,#7087f7 64%,#7db9e8 100%);' }} endIcon={<Key />} href='/auth/login'>Acceder</Button>
                        </Box>
                    )}

                    {

                        isLoggedIn && (

                            <Box display={'flex'} alignItems={'center'} sx={{ padding: 1 }} gap={1}>
                                <Box >


                                    <Tooltip title="Mi cuenta">
                                        <IconButton
                                            onClick={handleMenuUser}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar alt='avatar usuario' sx={{ bgcolor: '#0045AA', width: 50, height: 50 }} src={user?.persona.postulante[0].image ? `${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${user?.persona.postulante[0].image}` : '/avatar.png'} />

                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}

                                        keepMounted

                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseUser}

                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >

                                        <MenuItem onClick={handleCloseUser} >
                                            <ListItemIcon>
                                                <Avatar src={user?.oAuthImg ? user?.oAuthImg : user?.img} />
                                            </ListItemIcon>
                                            {user?.persona.nombres}
                                        </MenuItem>
                                        <Divider />
                                        {esJurado() && (
                                            <MenuItem onClick={() => push('/jurado')}>
                                                <ListItemIcon>
                                                    <PlaylistAddCheckCircleIcon />
                                                </ListItemIcon>
                                                Calificar</MenuItem>
                                        )}

                                        <MenuItem onClick={() => push('/postulant/ficha')} >
                                            <ListItemIcon>
                                                <ArticleOutlined fontSize="small" />
                                            </ListItemIcon>
                                            Ver mi ficha
                                        </MenuItem>
                                        <MenuItem onClick={() => push('/postulant')} >
                                            <ListItemIcon>
                                                <BorderColor fontSize="small" />
                                            </ListItemIcon>
                                            Actualizar mi ficha
                                        </MenuItem>

                                        <MenuItem onClick={() => push('/postulant/postulaciones')} disableRipple>
                                            <ListItemIcon>
                                                <Checklist fontSize="small" />
                                            </ListItemIcon>
                                            Ver mis postulaciones
                                        </MenuItem>

                                        <MenuItem onClick={logout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Salir
                                        </MenuItem>
                                    </Menu>




                                </Box>


                            </Box>



                        )
                    }


                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>

                        <IconButton aria-label="delete" onClick={toggleSideMenu} size="large">
                            <MenuIcon fontSize="inherit" />
                        </IconButton>
                    </Box>


                    <Box flex={1} sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} />


                </Toolbar>
                {isLoggedIn && (
                    //bgcolor={'#0045aa'}
                    <Box sx={{ background: 'linear-gradient(to right, #0045aa 0%,#4565d0 31%,#7087f7 64%,#7db9e8 100%); ' }} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} padding={1.8} >
                        <Box >
                            <Typography fontSize={23} fontWeight={'bold'} color={'#FFF'}>{`Bienvenido: ${user?.persona.nombres}`} </Typography>
                        </Box>

                        <Box display={matches ? 'flex' : 'none'} gap={2}>

                            <NextLink href='/postulant' passHref legacyBehavior>
                                <Link alignItems='end'>
                                    <Box display={'flex'}>
                                        {/* <InsertDriveFileIcon sx={{ color: asPath === '/postulant' ? '#EECA73' : '#FFF' }} /> */}
                                        <Typography fontSize={15} color={asPath === '/postulant' ? '#EECA73' : '#FFF'} fontWeight={asPath === '/postulant' ? 'bold' : ''}>Actualizar mi Ficha </Typography>
                                    </Box>


                                </Link>
                            </NextLink>
                            <NextLink href='/postulant/ficha' passHref legacyBehavior>
                                <Link alignItems='end'>
                                    <Typography fontSize={15} color={asPath === '/postulant/ficha' ? '#EECA73' : '#FFF'} fontWeight={asPath === '/postulant/ficha' ? 'bold' : ''} > Mi Ficha </Typography>

                                </Link>
                            </NextLink>
                            <NextLink href='/postulant/postulaciones' passHref legacyBehavior>
                                <Link alignItems='end'>
                                    <Typography fontSize={15} color={asPath === '/postulant/postulaciones' ? '#EECA73' : '#FFF'} fontWeight={asPath === '/postulant/postulaciones' ? 'bold' : ''} >Mis Postulaciones</Typography>

                                </Link>
                            </NextLink>

                            {isLoggedIn && user?.rol.name === 'jurado1' || user?.rol.name === 'jurado2' ? (
                                <NextLink href='/jurado' passHref legacyBehavior>
                                    <Link alignItems='end'>
                                        <Typography fontSize={15} color={'#FFF'}>Calificar</Typography>

                                    </Link>
                                </NextLink>
                            ) : (
                                <></>
                            )}
                        </Box>


                    </Box>
                )}
            </AppBar>

        </ElevationScroll >
    )
}
