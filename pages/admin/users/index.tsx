
import useSWR from 'swr';
import { useEffect, } from 'react';


import { Grid, Box, Typography, Select, MenuItem, SelectChangeEvent, Paper, Tabs, Tab, Toolbar, AppBar, useMediaQuery } from '@mui/material';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';

import { useRouter } from 'next/router';
;


import { useState } from 'react';
import { reclutApi } from '@/apies';


import { Paperbase } from '@/components/dash';




const UsersPage = () => {

    const { data, error } = useSWR<any[]>('/api/admin/users');
    const [usersList, setUsersList] = useState<any[]>([]);


    useEffect(() => {
        if (data) {
            setUsersList(data);
        }
    }, [data])



    {/*---------------------------------------* */ }
    const router = useRouter();

    const onStatusUpdated = async (id: number, newStatus: string) => {

        const previosUsers = usersList.map(user => ({ ...user }));
        const updatedUsers = usersList.map(user => ({
            ...user,
            estadoId: id === user.id ? parseInt(newStatus) : user.id
        }));


        setUsersList(updatedUsers);

        try {

            await reclutApi.put('/admin/users', { id, status: newStatus });

        } catch (error) {
            setUsersList(previosUsers);
            console.log(error);
            alert('No se pudo actualizar el role del usuario');
        }

    }


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },

        { field: 'nombres', headerName: 'Nombres', width: 300 },
        { field: 'email', headerName: 'Usuario', width: 250 },




        {
            field: 'rol',
            headerName: 'Rol',
            width: 250,
            renderCell: (params) => {

                return (


                    <Select
                        value={parseInt(params.row.rol)}
                        label="Rol"
                        onChange={(e: SelectChangeEvent<number>) => onStatusUpdated(params.row.id, (e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )
                        sx={{ width: '250px', }}
                    >
                        <MenuItem value={1}>Postulante</MenuItem>
                        <MenuItem value={2}>Administrador</MenuItem>
                        <MenuItem value={3}>Jurado Docente</MenuItem>
                        <MenuItem value={4}>Jurado Administrativo</MenuItem>

                    </Select>

                )
            }
        }


    ];


    const rows = usersList.map(user => ({
        id: user.id,
        nombres: user.persona.nombres + ' ' + user.persona.apellido_pat + ' ' + user.persona.apellido_mat,
        email: user.email,
        rol: user.rol_id,

    }))

    const Navigate = () => {
        return (
            <Tabs value={0} textColor="inherit">
                <Tab label="Users" />
                <Tab label="Sign-in method" />
                <Tab label="Templates" />
                <Tab label="Usage" />
            </Tabs>
        );
    }

    const navigateTo = (url: string) => {
        router.push(url);
    }
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Paperbase title={"Administrar Usuarios "} subTitle={"Listado de convocatorias"}>
            <Paper sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 350, margin: 'auto', overflow: 'visible' }}>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <span color="inherit" />
                            </Grid>
                            <Grid item xs>
                                <Typography>Lista de Usuarios</Typography>
                            </Grid>
                            {/* <Grid item>
                                <Button
                                    size='medium'
                                    startIcon={<AddCircleIcon />}

                                    onClick={() => navigateTo('/admin/convocatorias/new')}

                                >Nuevo</Button>

                            </Grid> */}
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box className="fadeIn" padding={4} sx={{ height: 580 }} width={'100%'} textAlign={'center'}>


                    <DataGrid
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        rows={rows}
                        columns={columns}
                        rowHeight={45}
                    />

                </Box>
            </Paper>


        </Paperbase>


    )
}


export default UsersPage