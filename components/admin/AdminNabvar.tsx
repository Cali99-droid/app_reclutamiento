import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar,  Avatar,  Box, Button,Link, Toolbar, Tooltip, Typography } from '@mui/material';
import { AuthContext, UiContext } from '@/context';


export const AdminNavBar = () => {


    const { toggleSideMenu } = useContext( UiContext );
    const { isLoggedIn,user } = useContext(  AuthContext );

    return (
        <AppBar>
            <Toolbar  >
                <NextLink href='/' passHref legacyBehavior>
                    <Link color={'secondary'} display='flex' alignItems='end'>                      
                        <Typography variant='h5' fontWeight={'bold'} >AE  </Typography>
                        <Typography variant='h6' sx={{ ml:0.5 }} >| Empleos</Typography>
                    </Link>  
                </NextLink>

                <Box flex={ 1 } />


                {

                    isLoggedIn&&(
                        
                          <Box sx={{padding:1}}>
                            <Tooltip title={`${user?.persona?.nombres}`}>
                         
                                <Avatar sx={{ bgcolor: '#0045AA' }}/>
                          
                            </Tooltip>
                          
                         </Box>
                         
                    )
                }
               
             

                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

             



            </Toolbar>
        </AppBar>
    )
}
