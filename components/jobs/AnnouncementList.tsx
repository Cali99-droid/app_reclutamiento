

import NextLink from 'next/link';
import { Grid, Link, Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/router';
;
import { IJob } from '@/interfaces';
import { NextPage } from 'next';


import DeleteIcon from '@mui/icons-material/Delete';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import Modal from '../modal/Modal';
import { useState } from 'react';
import { reclutApi } from '@/api';
  


 

interface Props{
  convocatorias:IJob[]
  
  }

 
export const AnnouncementList : NextPage<Props> = ({convocatorias}) => {
console.log(convocatorias)
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [jobs, setJobs] = useState(convocatorias)
  const [id, setId] = useState(0)
  const handleOpen = (id:number) => {
    setOpen(true);
    setId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
     deleteJob();
   
  };
  const refreshData = () => {
    router.replace(router.asPath)
  }
  const deleteJob= async()=>{
    try {
       reclutApi({
          url: '/admin/convocatorias',
          method:  'DELETE',  // si tenemos un _id, entonces actualizar, si no crear
          data: id
      }).then(()=>{
        refreshData()
      });  
       
 
      } catch (error) {
          console.log(error);   
      } 
       handleClose()

  }


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'titulo', headerName: 'Convocatoria', width: 200,
    renderCell: ({row}) => {
      return (
          <NextLink href={`/admin/convocatorias/${ row.id }`} passHref legacyBehavior>
              <Link underline='always'>
                  { row.titulo}
              </Link>
          </NextLink>
          )
      }

    },
    { field: 'vacantes', headerName: 'Vacantes disponibles', width: 160 },
    { field: 'sueldo', headerName: 'Sueldo Ofertado', width: 180 },
    { field: 'experiencia', headerName: 'Experiencia Mínima', width: 180 },
    { field: 'grado', headerName: 'Grado Mínimo', width: 180 },
    // { field: 'col3', headerName: 'Numero de Postulantes', width: 180 },
    { field: 'estado', headerName: 'Estado', width: 100 },
    { field: 'actions', headerName: 'Acciones', width: 200,
    sortable: false, 
    renderCell:(params)  => {
        return (
           <>    
            <IconButton aria-label="evaluar"  >
                                < GradingOutlinedIcon sx={{ color:'#0045aa' }}  />
            </IconButton>      
           
  
            <IconButton aria-label="delete" onClick={()=>{ handleOpen(params.row.id) } }  >
                                <DeleteIcon sx={{ color: red[800] }} />
            </IconButton>
           </>
            )
        } 
    }
   
  ];


  const rows = jobs.map(job=>({
    id:job.id,
    titulo:job.titulo,
    vacantes:job.vacantes,
    estado: job.estado.nombre.toLocaleUpperCase(),
    sueldo:'S/'+job.sueldoOfertado, 
    experiencia:job.experiencia.toString() + ' '+ 'Años',
    grado:job.grado.nombre.toLocaleUpperCase(),
    jobId: job.id
  }))
 


  const navigateTo = ( url: string ) => {
    router.push(url);
   }
   
  return (
    <><Grid 
    container 
    spacing={4}
    marginTop={'.1rem'} 
    justifyContent={'end'}
      >
        <Grid item >
          <Button 
          size='medium'
          startIcon={<AddCircleIcon/> } 
       
          onClick={ () => navigateTo('/admin/convocatorias/new')}
          
          >Nuevo</Button>
        </Grid > 
        <Grid item xs={12} sx={{ height:650, width: '100%' }}>
            
            <DataGrid 
            rows={rows} 
            columns={columns} 

            />
        </Grid>
    </Grid>
    
      <Modal title={'¿ Esta seguro de eliminar la convocatoria ?'} open={open} handleClose={ handleClose} handleConfirm={ handleConfirm}>
              <Typography >La Convocatoria se eliminará definitivamente</Typography>

      </Modal>
    </>
    
  )
}
