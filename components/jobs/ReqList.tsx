import * as React from 'react';

import { indigo, blue, cyan } from '@mui/material/colors';

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';

import { IJob } from '@/interfaces';
import { Chip } from '@mui/material';


interface Props {
  job: IJob;
}
export const ReqList: React.FC<Props> = ({ job }) => {
  return (
    < >
      <Chip variant='outlined' color='info' icon={<WorkIcon />} sx={{ ml: 1, mt: 1 }} label={`+ ${job.experiencia} Años de experiencia`} />
      <Chip variant='outlined' color='info' icon={<SchoolIcon />} sx={{ ml: 1, mt: 1 }} label={` ${job.grado.nombre} `} />
      <Chip variant='outlined' color='info' icon={<GroupIcon />} sx={{ ml: 1, mt: 1 }} label={`${job.vacantes} Vacantes`} />
    </>
  );
}