import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Avatar, Box, Button, Divider, IconButton, Input, InputAdornment, Link, Slide, Toolbar, Tooltip, Typography, useScrollTrigger } from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';

import { AuthContext, UiContext } from '@/context';
import Lenis from '@studio-freight/lenis';

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




export const Compo = () => {

    return (
        <div>
            el compneinf
        </div>

    )
}
