import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Router, useRouter } from 'next/router';

import { AppBar, Avatar, Box, Button, Divider, IconButton, Input, InputAdornment, Link, Menu, MenuItem, MenuProps, Slide, Toolbar, Tooltip, Typography, alpha, styled, useScrollTrigger } from '@mui/material';
import { ClearOutlined, ConfirmationNumberOutlined, SearchOutlined } from '@mui/icons-material';

import { AuthContext, UiContext } from '@/context';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilePresentIcon from '@mui/icons-material/FilePresent';
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

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
    }

    const { isLoggedIn, user } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <ElevationScroll {...props}>
            <AppBar sx={{ borderBottom: '1px solid #e1eeee' }} >
                <Toolbar >
                    <Box flex={1} />
                    <NextLink href='/' passHref legacyBehavior>
                        <Link color={'secondary'} display='flex' alignItems='end'>
                            <Typography variant='h5' fontWeight={'bold'} >AE  </Typography>
                            <Typography variant='h6' sx={{ ml: 0.5 }} >| Empleos</Typography>
                        </Link>
                    </NextLink>

                    <Box flex={1} />

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

                    </Box>
                    {isLoggedIn && user?.rol.name === 'postulante' && (
                        <div>
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                Mis Datos
                            </Button>
                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => push('/postulant')} disableRipple>
                                    <EditIcon />
                                    Actualizar mi ficha
                                </MenuItem>
                                <MenuItem onClick={() => push('/postulant/ficha')} disableRipple>
                                    <FilePresentIcon />
                                    Ver mi ficha
                                </MenuItem>
                                <MenuItem onClick={() => push('/postulant/postulaciones')} disableRipple>
                                    <ConfirmationNumberOutlined />
                                    Mis postulaciones
                                </MenuItem>

                            </StyledMenu>
                        </div>)}


                    <Box flex={1} />


                    {/* Pantallas pantallas grandes */}



                    {

                        isLoggedIn && (

                            <Box display={'flex'} alignItems={'center'} sx={{ padding: 1 }} gap={1}>
                                <Box >
                                    <Tooltip title={`${user?.persona?.nombres}`}>

                                        <Avatar sx={{ bgcolor: '#0045AA' }} src={user?.oAuthImg ? user?.oAuthImg : ''} />

                                    </Tooltip>


                                </Box>
                                {user?.rol.name === 'admin' && (
                                    <Box>
                                        <Button variant='outlined' onClick={() => push('/admin/convocatorias')}>Administrar</Button>
                                    </Box>
                                )}

                            </Box>



                        )
                    }



                    <Button onClick={toggleSideMenu}>
                        Menú
                    </Button>




                    <Box flex={1} />
                </Toolbar>

            </AppBar>

        </ElevationScroll>
    )
}
