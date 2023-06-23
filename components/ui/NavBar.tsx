import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Router, useRouter } from 'next/router';

import { AppBar, Avatar, Box, Button, Divider, IconButton, Input, InputAdornment, Link, ListItemIcon, Menu, MenuItem, MenuProps, Slide, Toolbar, Tooltip, Typography, alpha, styled, useScrollTrigger } from '@mui/material';
import { AccountBalance, AccountCircleSharp, ArticleOutlined, BorderColor, Checklist, ClearOutlined, ConfirmationNumberOutlined, Logout, SearchOutlined } from '@mui/icons-material';

import { AuthContext, UiContext } from '@/context';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import MenuIcon from '@mui/icons-material/Menu';
import ContactPageIcon from '@mui/icons-material/ContactPage';
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

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


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


    const handleMenuUser = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorEl(null);
    };

    return (
        <ElevationScroll {...props}>
            <AppBar sx={{ borderBottom: '1px solid #e1eeee' }} >
                <Toolbar >
                    <Box flex={1.5} />
                    <NextLink href='/' passHref legacyBehavior>
                        <Link color={'secondary'} display='flex' alignItems='end'>
                            <Typography variant='h5' fontWeight={'bold'} >AE  </Typography>
                            <Typography variant='h6' sx={{ ml: 0.5 }} >| Empleos</Typography>
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
                        <NextLink href='/beneficios' passHref legacyBehavior>
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
                        </NextLink>
                        {isLoggedIn && user?.rol.name === 'postulante' && (
                            <NextLink href='/mis-datos' passHref legacyBehavior>
                                <Link
                                    color={asPath === '/mis-datos' ? '#0045aa' : '#767687'}
                                    sx={{ padding: '1.5rem', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 14 }}
                                    fontWeight={asPath === '/docentes' ? 600 : 500}
                                >
                                    Mis Datos
                                </Link>
                            </NextLink>
                        )}

                    </Box>



                    <Box flex={.5} />


                    {/* Pantallas pantallas grandes */}

                    {!isLoggedIn && (
                        <Box sx={{ padding: 1 }}>
                            <Button href='/auth/login'>Acceder</Button>
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

                                            <Avatar sx={{ bgcolor: '#0045AA' }} src={user?.oAuthImg ? user?.oAuthImg : user?.img} />

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

                                        <MenuItem onClick={handleCloseUser}>
                                            <ListItemIcon>
                                                <Avatar src={user?.oAuthImg ? user?.oAuthImg : user?.img} />
                                            </ListItemIcon>
                                            {user?.persona.nombres}
                                        </MenuItem>
                                        <Divider />
                                        {isLoggedIn && user?.rol.name === 'jurado1' && (
                                            <MenuItem onClick={() => push('/jurado')}>Calificar</MenuItem>
                                        )}
                                        {isLoggedIn && user?.rol.name === 'postulante' && (
                                            <Box>
                                                <MenuItem onClick={() => push('/postulant/ficha')} disableRipple>
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
                                            </Box>
                                        )}
                                        <MenuItem onClick={logout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Salir
                                        </MenuItem>
                                    </Menu>




                                </Box>
                                {user?.rol.name === 'admin' && (
                                    <Box>
                                        <Button variant='outlined' onClick={() => push('/admin/convocatorias')}>Administrar</Button>
                                    </Box>
                                )}

                            </Box>



                        )
                    }


                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>

                        <IconButton aria-label="delete" onClick={toggleSideMenu} size="large">
                            <MenuIcon fontSize="inherit" />
                        </IconButton>
                    </Box>


                    <Box flex={1.5} />


                </Toolbar>

            </AppBar>

        </ElevationScroll>
    )
}
