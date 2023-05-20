import { FC } from 'react';

import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, Chip, CardContent, Button, CardActionArea, IconButton, ListItemAvatar, ListItemText, ListItem } from '@mui/material'




import { IJob } from '@/interfaces';
import ShareIcon from '@mui/icons-material/Share';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { ReqList } from './ReqList';
import NextLink from 'next/link';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';


interface Props {
    job: IJob;
}

export const JobCard: FC<Props> = ({ job }) => {


    return (
        <Grid item
            xs={12}
            sm={3}

        >
            <Card>

                <NextLink href={`/convocatorias/${job.id}`} passHref prefetch={false} legacyBehavior>

                    <Link>
                        <CardActionArea>
                            <CardMedia
                                sx={{ height: 250 }}
                                image="/jobs/img-6.jpg"
                                title="green iguana"
                            />
                            <CardContent>
                                <Box display={'flex'} gap={1}>

                                    <Typography fontWeight={800} gutterBottom variant="h5" >
                                        {job.titulo}
                                    </Typography>

                                    <Box>
                                        <IconButton aria-label="share" size='small'>
                                            <ShareIcon />
                                        </IconButton>
                                    </Box>

                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {job.descripcion}
                                </Typography>
                                <ReqList job={job} />
                                {/* <Box mt={1}>
                            <Chip label={`${job.categoria}`} color="success" variant="outlined" />
                        </Box> */}
                            </CardContent>

                        </CardActionArea>

                    </Link>

                </NextLink>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color='info' startIcon={<PostAddIcon />} sx={{ mt: 3, width: '100%' }} size="large" href={`/postulant/postular/${job.id}`}>
                        Postular
                    </Button>


                </CardActions>
            </Card>

        </Grid>
    )
}
