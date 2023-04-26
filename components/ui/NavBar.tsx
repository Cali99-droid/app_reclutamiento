import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Avatar, Box, Button, Divider, IconButton, Input, InputAdornment, Link, Slide, Toolbar, Tooltip, Typography, useScrollTrigger } from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';

import { AuthContext, UiContext } from '@/context';

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


export const NavBar = (props: Props) => {

    const { asPath, push } = useRouter();

    const { toggleSideMenu } = useContext(UiContext);
    const [searchTerm, setSearchTerm] = useState('');

    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
    }

    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <ElevationScroll {...props}>
            <AppBar >
                <Toolbar >
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
                                color={asPath === '/' ? '#0045aa' : 'secondary'}
                                sx={{ padding: '1.5rem' }}
                                fontWeight={asPath === '/' ? 600 : 500}

                            >
                                Inicio
                            </Link>
                        </NextLink>
                        <NextLink href='/convocatorias' passHref legacyBehavior>
                            <Link
                                color={asPath === '/convocatorias' ? '#0045aa' : 'secondary'}
                                sx={{ padding: '1.5rem' }}
                                fontWeight={asPath === '/convocatorias' ? 600 : 500}
                            >
                                Convocatorias
                            </Link>

                        </NextLink>
                        <NextLink href='/beneficios' passHref legacyBehavior>
                            <Link
                                color={asPath === '/beneficios' ? '#0045aa' : 'secondary'}
                                sx={{ padding: '1.5rem' }}
                                fontWeight={asPath === '/beneficios' ? 600 : 500}

                            >
                                Beneficios
                            </Link>
                        </NextLink>
                        <NextLink href='/docentes' passHref legacyBehavior>
                            <Link
                                color={asPath === '/docentes' ? '#0045aa' : 'secondary'}
                                sx={{ padding: '1.5rem' }}
                                fontWeight={asPath === '/docentes' ? 600 : 500}
                            >
                                ¿Cómo Postular?
                            </Link>
                        </NextLink>

                    </Box>


                    <Box flex={1} />



                    {/* Pantallas pantallas grandes */}
                    {
                        isSearchVisible
                            ? (
                                <Input
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                    className='fadeIn'
                                    autoFocus
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                    type='text'
                                    placeholder="Buscar..."
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setIsSearchVisible(false)}
                                            >
                                                <ClearOutlined />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            )
                            :
                            (
                                <IconButton
                                    onClick={() => setIsSearchVisible(true)}
                                    className="fadeIn"
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                >
                                    <SearchOutlined />
                                </IconButton>
                            )
                    }


                    {

                        isLoggedIn && (

                            <Box sx={{ padding: 1 }}>
                                <Tooltip title={`${user?.persona?.nombres}`}>

                                    <Avatar sx={{ bgcolor: '#0045AA' }} />

                                </Tooltip>

                            </Box>

                        )
                    }



                    <Button onClick={toggleSideMenu}>
                        Menú
                    </Button>





                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}
