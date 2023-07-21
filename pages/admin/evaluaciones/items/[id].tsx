import NextLink from 'next/link';
import { AdminLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { GetServerSideProps, NextPage } from "next";

import { Box, Toolbar, AppBar, Paper, Grid, Typography, Button, useMediaQuery, Link, Chip, TextField, Breadcrumbs, IconButton } from '@mui/material';


import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { Paperbase } from '@/components/dash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { item, test } from '@prisma/client';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import { Modal } from '@/components/modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reclutApi } from '@/apies';
import ModalAlert from '../../../../components/modal/ModalAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

interface Props {
    test: test,
    items: item[]
}

const EntrevistaPage: NextPage<Props> = ({ test, items }) => {
    const [open, setOpen] = useState(false)
    const [descripcion, setDescripcion] = useState('')
    const [itemsE, setItemsE] = useState<item[]>(items)
    const [id, setId] = useState<Number>()
    const [openAlert, setOpenAlert] = useState(false)
    const idTest = test.id;
    const agregarItem = async () => {
        const { data } = await reclutApi.post<any>('/admin/item', { descripcion, idTest });

        setItemsE([...itemsE, data.item])
    }
    const handleConfirm = () => {
        if (descripcion.length === 0) {
            toast.warning('Complete correctamente todos los campos')
            return;
        };
        if (id) {
            editarItem()

        } else {
            agregarItem();
            toast.success('Agregado con éxito')
        }

        setOpen(false)
        handleClose()
    }
    const editarItem = async () => {
        try {
            const { data } = await reclutApi.put<any>('/admin/item', { descripcion, id });

            toast.success('Actualizado con éxito')
            const itemsAct = [...itemsE.map(t => {
                if (t.id === data.item.id) {
                    t.descripcion = data.item.descripcion
                }
                return t;
            })]
            setItemsE(itemsAct)
        } catch (error) {
            console.log(error)
        }


    }
    const handleClose = () => {
        setOpen(false);
        setOpenAlert(false)
        setId(0);
        setDescripcion('');

    }
    const handleConfirmDelete = async () => {

        try {
            const { data } = await reclutApi.delete<any>(`/admin/item/${id}`);
            toast.success('Eliminado Correctamente')
            const itemsAct = itemsE.filter(t => t.id !== id);
            setItemsE(itemsAct)
            handleClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message)
                return;
            }
            console.log(error)
            return;

        }



    }
    const onItemChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {

        }
        setDescripcion(event.target.value);

    }


    const handleDelete = (id: number) => {
        toast.info('Eliminado Registro ...')
        // quitarTest(id)
    }
    const handleEdit = (id: number, descripcion: string) => {
        setOpen(true)
        setId(id)
        setDescripcion(descripcion)

    }
    const hadleOpenAlert = (id: number, descripcion: string) => {
        setOpenAlert(true)

        setDescripcion(descripcion)
        setId(id)
    }
    const columns: GridColDef[] = [

        {
            field: 'nombre', headerName: 'Nombre', width: 320

        },
        {
            field: 'action',
            headerName: 'Acciones',
            width: 250,
            renderCell: (params) => {
                return (
                    <Box display={'flex'} justifyContent={'end'} width={'100%'}>
                        <IconButton disabled={params.row.postulantes > 0} aria-label="editar" color='info' onClick={() => { handleEdit(params.row.id, params.row.nombre) }}  >
                            <EditIcon />
                        </IconButton>


                        <IconButton disabled={params.row.postulantes > 0} color='error' aria-label="delete" onClick={() => { hadleOpenAlert(params.row.id, params.row.nombre) }}  >
                            <DeleteIcon />
                        </IconButton>
                    </Box>

                )
            }
        }

    ];
    const rows = itemsE.map((item: item) => ({
        id: item.id,
        nombre: item.descripcion,
    }))
    const router = useRouter();
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Paperbase title={`Gestión de Items`} subTitle={"Entrevista"}>
            <Box mb={2}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" onClick={() => router.push("/admin/evaluaciones")} sx={{ cursor: 'pointer' }}>
                        Evaluaciones
                    </Link>

                    <Typography fontWeight={'bold'} color="text.primary">{test.nombre}</Typography>
                </Breadcrumbs>
            </Box>
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
                                <Typography>Gestion de Items de la evaluacion: {test.nombre}</Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    size='medium'
                                    startIcon={<AddCircleIcon />}

                                    onClick={() => setOpen(true)}

                                >Nuevo</Button>

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box className="fadeIn" padding={4} sx={{ height: 580 }} width={'100%'} textAlign={'center'}>
                    <DataGrid
                        getRowHeight={() => 'auto'}

                        // getRowId={(row: any) => generateRandom()}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        columns={columns}
                        rows={rows} />
                </Box>
            </Paper>

            <Modal title={`Agregar Item a ${test.nombre}`} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>

                <Box display={'flex'} flexDirection={'column'} gap={2}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, },
                    }}
                    noValidate
                    autoComplete="on" >

                    <TextField value={descripcion} id="item" label="Nombre del item" variant="outlined" onChange={onItemChange}
                    />
                </Box>

            </Modal>
            <Modal title={'¿Estas seguro de eliminar el item?'} open={openAlert} handleClose={handleClose} handleConfirm={handleConfirmDelete}>
                <Typography>{`Se eliminará el item: ${descripcion}`}</Typography>

            </Modal>
        </Paperbase>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { id = '' } = query;
    const test = await prisma.test.findFirst({
        where: {
            id: parseInt(id.toString())
        }
    });

    const items = await prisma.item.findMany({
        where: {
            test_id: parseInt(id.toString())
        }
    })
    return {
        props: {
            test,
            items
        }
    }
}


export default EntrevistaPage;
