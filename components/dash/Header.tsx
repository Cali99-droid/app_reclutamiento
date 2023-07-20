import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { AuthContext } from '@/context';
import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { useRouter } from 'next/router';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface HeaderProps extends React.PropsWithChildren {
    onDrawerToggle: () => void;
    titulo: string,
}

export default function Header(props: HeaderProps) {
    const { onDrawerToggle } = props;
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const { push } = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <AppBar sx={{ background: 'linear-gradient(to right, #0045aa 0%,#4565d0 31%,#7087f7 64%,#7db9e8 100%); ' }} position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Link

                                href="/convocatorias"
                                variant="body2"
                                sx={{
                                    textDecoration: 'none',
                                    color: lightColor,
                                    '&:hover': {
                                        color: 'common.white',
                                    },
                                }}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Convocatorias
                            </Link>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title={`${user?.persona?.nombres}`}>
                                <IconButton color="inherit" sx={{ p: 0.5 }} onClick={handleClick}>
                                    <Avatar alt="My Avatar" src={user?.oAuthImg ? user?.oAuthImg : user?.img} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
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
                                <MenuItem onClick={() => push('/perfil')}>
                                    <Avatar src={user?.oAuthImg ? user?.oAuthImg : user?.img} /> Mi perfil
                                </MenuItem>
                                {/* <MenuItem onClick={() => push('/perfil')}>
                                    <Avatar /> My account
                                </MenuItem> */}
                                <Divider />
                                {/* <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem> */}
                                <MenuItem onClick={() => push('/perfil')}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Config
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Salir
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                // color="primary"

                position="static"
                elevation={0}
                sx={{ zIndex: 0, background: 'linear-gradient(to right, #0045aa 0%,#4565d0 31%,#7087f7 64%,#7db9e8 100%); ' }}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                {props.titulo}
                            </Typography>
                        </Grid>
                        {/* <Grid item>
                            <Button
                                sx={{ borderColor: lightColor }}
                                variant="outlined"
                                color="inherit"
                                size="small"
                            >
                                Web setup
                            </Button>
                        </Grid> */}
                        <Grid item>
                            <Tooltip title="Ayuda">
                                <IconButton color="inherit">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                {/* <Tabs value={0} textColor="inherit">
                    <Tab label="Users" />
                    <Tab label="Sign-in method" />
                    <Tab label="Templates" />
                    <Tab label="Usage" />
                </Tabs> */
                    props.children
                }
            </AppBar>
        </React.Fragment>
    );
}