import NextLink from 'next/link';
import { Grid, Link, Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { green, orange, red } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/router';
;
import { IJob } from '@/interfaces';
import { NextPage } from 'next';
  


 const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'titulo', headerName: 'Convocatoria', width: 200 },
    { field: 'vacantes', headerName: 'Vacantes disponibles', width: 180 },
    { field: 'sueldo', headerName: 'Sueldo Ofertado', width: 180 },
    { field: 'experiencia', headerName: 'Experiencia Mínima', width: 180 },
    // { field: 'col3', headerName: 'Numero de Postulantes', width: 180 },
    { field: 'estado', headerName: 'Fase', width: 180 },
    { field: 'actions', headerName: 'Acciones', width: 180,
    sortable: false, 
    renderCell:(params)  => {
        return (
           <>          
           <NextLink href={`/admin/convocatorias/${params.row.jobId}`} passHref legacyBehavior >
                    <Link underline='always' color={green[700]}>
                        Evaluar 
                    </Link>
                
            </NextLink>
            <NextLink href={`/admin/convocatorias/edit?id=${params.row.jobId}`} passHref legacyBehavior>
            <Link underline='always'ml={2} color={orange[700]}>
                  Editar 
            </Link>
        
            </NextLink>
            <NextLink href={'/delete'} passHref legacyBehavior>
            <Link underline='always'ml={2} color={red[700]}>
                  Eliminar 
            </Link>
        
            </NextLink>
           </>
            )
        } 
    }
   
  ];

// const rows = [
//     { id: 1, col1: 'Docente Primaria', col2: 3,col3:12, col4:'Vigente' },
//     { id: 2, col1: 'Docente Secundaria', col2: 5,col3:20, col4:'En preselección' },
//     { id: 3, col1: 'Auxiliar', col2: 1,col3:10, col4:'Finalizado' },
//   ];
interface Props{
  convocatorias:IJob[]
 
  }

 
export const AnnouncementList : NextPage<Props> = ({convocatorias}) => {

  const rows = convocatorias.map(job=>({
    id:job.id,
    titulo:job.titulo,
    vacantes:job.vacantes,
    fase: job.estadoId,
    sueldo:'S/'+job.sueldoOfertado, 
    experiencia:job.experiencia.toString() + ' '+ 'Años',
    jobId: job.id
  }))
 

  const router = useRouter();
  const navigateTo = ( url: string ) => {
    router.push(url);
   }
   
  return (
    <Grid 
    container 
    spacing={4}
    marginTop={'.1rem'} 
    justifyContent={'end'}
    
    
    >
        <Grid item >
          <Button 
          size='medium'
          startIcon={<AddCircleIcon/> } 
       
          onClick={ () => navigateTo('/admin/convocatorias/create')}
          
          >Nuevo</Button>
        </Grid > 
        <Grid item xs={12} sx={{ height:650, width: '100%' }}>
            
            <DataGrid 
            rows={rows} 
            columns={columns} 
           
            />
        </Grid>
    </Grid>
  )
}
