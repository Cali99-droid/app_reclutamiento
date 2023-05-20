import { FC } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material'
import Typography from '@mui/material/Typography';
import { JobCard } from './JobCard';
import { IJob } from '@/interfaces';
import { grey, pink } from '@mui/material/colors';


interface Props {
  jobs: IJob[]
}

export const JobList: FC<Props> = ({ jobs }) => {

  return (
    <Grid container columns={{ xs: 4, md: 12 }}
      spacing={2} marginTop={2} padding={2} borderRadius={4}>
      {
        jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))
      }

    </Grid>
  )
}
