import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { indigo, blue, cyan } from '@mui/material/colors';

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';

import { IJob } from '@/interfaces';


interface Props {
  job: IJob;
}
export const ReqList: React.FC<Props> = ({ job }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }} >
      <ListItem >
        <ListItemAvatar >
          <Avatar sx={{ bgcolor: '#C5A862' }}>
            <SchoolIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ color: '#9E002B' }} primary={job.grado.nombre.toLocaleUpperCase()} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: '#008A65' }}>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`S/ ${job.sueldoOfertado}`} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: '#3157C0' }}>
            <AssignmentIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`+ ${job.experiencia} Años de experiencia`} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: '#001C75 ' }}>
            <GroupIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Vacantes:  ${job.vacantes}`} />
      </ListItem>

    </List>
  );
}