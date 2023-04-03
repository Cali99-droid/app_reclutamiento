import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar,  Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';

import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';



export const NavBar = () => {

    const { asPath, push } = useRouter();


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
                       
                        <Typography variant='h5' >AE | </Typography>
                        <Typography variant='h6' sx={{ ml:0.5 }} >Empleos</Typography>
                       
                    </Link>  
                </NextLink>

                <Box flex={ 1 } />

                <Box  sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                   gap={'2rem'} >
                          <NextLink href='/' passHref legacyBehavior>
                        <Link 
                        color={ asPath === '/' ?'#008C93' : 'secondary'} 
                      
                        sx={{ padding:'1.5rem',fontWeight:'bold'}}>
                            Inicio
                        </Link>
                    </NextLink>
                    <NextLink href='/convocatorias' passHref legacyBehavior>
                        <Link 
                          color={ asPath === '/convocatorias' ? '#008C93':'secondary'} 
                        sx={{ padding:'1.5rem',fontWeight:'bold'}}>
                            Convocatorias
                        </Link>
                    </NextLink>
                    <NextLink href='/docentes' passHref legacyBehavior>
                        <Link 
                          color={ asPath === '/docentes' ?'#008C93' :'secondary'} 
                        sx={{ padding:'1.5rem', fontWeight:'bold'}}>
                           Docentes
                        </Link>
                    </NextLink>
                    <NextLink href='/beneficios' passHref legacyBehavior>
                        <Link 
                          color={ asPath === '/beneficios' ? '#008C93':'secondary'} 
                        sx={{ padding:'1.5rem', fontWeight:'bold'}}>
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
               



            </Toolbar>
        </AppBar>
    )
}
