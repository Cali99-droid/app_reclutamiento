import { IJob } from "@/interfaces";


export const jobs:IJob[] = [

    {
      id:'1',
       titulo: 'Docente Primaria', descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur orci non dignissim imperdiet. ',
       requisito:'Bachiller',
       vacantes:6,
       img: 'img-1',
       categoria:'Docentes',
       especialidad: 'Inglés'
    },
    {
      id:'2',
        titulo: 'Docente Secundaria', descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur orci non dignissim imperdiet. ',
        requisito:'Titulado',
        vacantes:4,
        img: 'img-2',
        categoria:'Docentes',
        especialidad:'Matematica'
     },
     {
      id:'3',
        titulo: 'Auxiliar', descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur orci non dignissim imperdiet. ',
        requisito:'Todos',
        vacantes:2,
        img: 'img-3',
        categoria:'Administrativo',
        especialidad:'Todos'
     },
     {
      id:'4',
        titulo: 'Personal de servicio', descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur orci non dignissim imperdiet. ',
        requisito:'Primaria',
        vacantes:1,
        img: 'img-4',
        categoria:'Administrativo',
        especialidad:'Todos'
     },
     {
      id:'5',
        titulo: 'Docente  Primaria', descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur orci non dignissim imperdiet. ',
        requisito:'Todos',
        vacantes:2,
        img: 'img-5',
        categoria:'Docentes',
        especialidad:'Comunicacion'
     },
     {
      id:'6',
        titulo: 'Auxiliar', descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur orci non dignissim imperdiet. ',
        requisito:'Bachiller',
        vacantes:1,
        img: 'img-6',
        categoria:'Administrativo',
        especialidad:'Todos'
     }
]

