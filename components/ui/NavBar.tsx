import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar,  Box, Button, Divider, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';

import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { UiContext } from '@/context';



export const NavBar = () => {

    const { asPath, push } = useRouter();

    const { toggleSideMenu } = useContext( UiContext );
    const [searchTerm, setSearchTerm] = useState('');

    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }

    

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

                <Box  sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                     gap={'2rem'} >
                          <NextLink href='/' passHref legacyBehavior>
                        <Link 
                                color={ asPath === '/' ? '#0045aa':'secondary'} 
                                sx={{ padding:'1.5rem'}}
                                fontWeight={asPath === '/' ? 600:500}
                        
                        >
                            Inicio
                        </Link>
                    </NextLink>
                    <NextLink href='/convocatorias' passHref legacyBehavior>
                        <Link 
                          color={ asPath === '/convocatorias' ? '#0045aa':'secondary'} 
                          sx={{ padding:'1.5rem'}}
                          fontWeight={asPath === '/convocatorias' ? 600:500}
                          >
                            Convocatorias 
                        </Link>
                       
                    </NextLink>
                   
                    <NextLink href='/docentes' passHref legacyBehavior>
                        <Link 
                          color={ asPath === '/docentes' ? '#0045aa':'secondary'} 
                          sx={{ padding:'1.5rem'}}
                          fontWeight={asPath === '/docentes' ? 600:500}
                        >
                           Docentes
                        </Link>
                    </NextLink>
                    <NextLink href='/beneficios' passHref legacyBehavior>
                        <Link 
                          color={ asPath === '/beneficios' ? '#0045aa':'secondary'} 
                          sx={{ padding:'1.5rem'}}
                          fontWeight={asPath === '/beneficios' ? 600:500}
                        
                        >
                           Beneficios
                        </Link>
                    </NextLink>
                </Box>


                <Box flex={ 1 } />
                
                

                {/* Pantallas pantallas grandes */}
                {
                    isSearchVisible 
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
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
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
                }


                {/* Pantallas pequeñas */}
               


                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
