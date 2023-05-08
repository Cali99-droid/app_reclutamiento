import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Avatar, Box, Button, Link, Toolbar, Tooltip, Typography, useScrollTrigger } from '@mui/material';
import { AuthContext, UiContext } from '@/context';
import * as React from 'react';


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


export const AdminNavBar = () => {

    const props: Props = {
        window: undefined,
        children: <></>

    };
    const { toggleSideMenu } = useContext(UiContext);
    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <ElevationScroll {...props}>
            <AppBar>
                <Toolbar  >
                    <NextLink href='/' passHref legacyBehavior>
                        <Link color={'secondary'} display='flex' alignItems='end'>
                            <Typography variant='h5' fontWeight={'bold'} >AE  </Typography>
                            <Typography variant='h6' sx={{ ml: 0.5 }} >| Empleos</Typography>
                        </Link>
                    </NextLink>

                    <Box flex={1} />


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
