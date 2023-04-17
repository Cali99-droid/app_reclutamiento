import { FC } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material'
import Typography from '@mui/material/Typography';
import { JobCard } from './JobCard';
import { IJob } from '@/interfaces';


interface Props {
   jobs:IJob[]
}

export const JobList :FC<Props>= ({jobs}) => {

  return (
    <Grid container spacing={4} marginTop={'.1rem'}>
        {
            jobs.map(job=>(
                <JobCard key={job.id}  job={job}/>
            ))
        }
    
    </Grid>
  )
}
