import { FC, useReducer, useState } from 'react';
import { DatosContext, datosReducer } from './';
import Step1 from '@/components/pasos/Step1';
import Step3 from '@/components/pasos/Step3';
import Step4 from '@/components/pasos/Step4';
import Step5 from '@/components/pasos/Step5';
import Step2 from '@/components/pasos/Step2';
import { IAficion, ICapacitacion, ICargo, IEstudio, IInvestigacion, IReconocimiento, ITics } from '@/interfaces';



export interface DatosState {
    prop: boolean,
    estudios: IEstudio[]
    investigaciones: IInvestigacion[]
    cargos: ICargo[]
    capacitaciones: ICapacitacion[]
    reconocimientos: IReconocimiento[]
    aficiones: IAficion[]
    tecnologias: ITics[]
}

const DATOS_INITIAL_STATE: DatosState = {
    prop: false,
    estudios: [
        {
            id: 1,
            institucion: 'Universidad Prueba',
            profesion: 'Docente primaria',
            grado: 'Bachiller',
            year: '2013'

        },
        {
            id: 2,
            institucion: 'Universidad Prueba dos',
            profesion: 'Docente matematica',
            grado: 'Doctor',
            year: '2019'
        }
    ],
    investigaciones: [
        {
            id: 1,
            institucion: 'Universidad Prueba',
            nombre: 'Investigacion 1',
            year: '2013'

        },
        {
            id: 2,
            institucion: 'Universidad Prueba dos',
            nombre: 'Investigacion 2',
            year: '2019'
        }
    ],
    cargos: [
        {
            id: 1,
            institucion: 'institucion: Universidad Prueba',
            referencia: '963852741',
            remuneracion: '2000',
            nivel: 'Primaria',
            cantidadCargo: '23',

            year: '2013'

        },
        {
            id: 2,
            institucion: 'Referencia : Universidad Prueba dos',
            referencia: '963852741',
            remuneracion: '2000',
            nivel: 'Secundaria',
            cantidadCargo: '33',

            year: '2019'
        }
    ],
    capacitaciones: [
        {
            id: 1,
            institucion: 'Universidad Prueba',
            titulo: 'Curso java',
            horas: '34',
            year: '2013',
            descripcion: 'En el desaarolo de aps',

        },
        {
            id: 2,
            institucion: 'Universidad Prueba 2',
            titulo: 'Curso php',
            horas: '34',
            year: '2013',
            descripcion: 'En el desaarolo de aps',
        }
    ],
    reconocimientos: [
        {
            id: 1,
            institucion: 'Universidad Prueba 2',
            reconocimento: 'Al merito',
            year: '2013',
            descripcion: 'en el concuros de ejemplos',

        },
        {
            id: 2,
            institucion: 'Universidad Prueba 2',
            reconocimento: 'Ganador',
            year: '2013',
            descripcion: 'En el desaarolo de aps',
        }
    ],
    aficiones: [
        {
            id: 1,
            actividad: 'Ajedrez',
            nivel: 'Intermedio',
            logro: 'Campeon regional',
            year: '2013'

        },
        {
            id: 2,
            actividad: 'Futbol',
            nivel: 'Intermedio',
            logro: 'ninguno',
            year: '2018'
        }
    ],
    tecnologias: [
        {
            id: 1,
            tecnologia: 'Word',
            nivel: 'Basico',
        },
        {
            id: 2,
            tecnologia: 'Excel',
            nivel: 'Basico',
        }
    ]
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const DatosProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(datosReducer, DATOS_INITIAL_STATE)

    const steps = [
        { label: 'Paso 1', content: <Step1 /> },
        { label: 'Paso 2', content: <Step2 /> },
        { label: 'Paso 3', content: <Step3 /> },
        { label: 'Paso 4', content: <Step4 /> },
        { label: 'Paso 5', content: <Step5 /> },
    ];


    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    //-----------------estudios..................
    const agregarEstudio = (profesion: string, institucion: string, grado: string, year: string) => {
        const nuevoEstudio: IEstudio = {
            id: 0,
            profesion,
            institucion,
            grado,
            year
        }
        dispatch({ type: 'Add-Estudio', payload: nuevoEstudio });
    }
    const quitarEstudio = (id: number) => {
        dispatch({ type: 'Delete-Estudio', payload: id });

    }
    //---------------Investigaciones--------------
    const agregarInvestigacion = (nombre: string, institucion: string, year: string) => {
        const nuevaInvestigacion: IInvestigacion = {
            id: 12,
            nombre,
            year,
            institucion
        }
        dispatch({ type: 'Add-Investigacion', payload: nuevaInvestigacion });

    }
    const quitarInvestigacion = (id: number) => {
        dispatch({ type: 'Delete-Investigacion', payload: id });

    }

    //-------------------Cargos-----------------------
    const agregarCargo = (referencia: string, nivel: string, cantidad: string, year: string, institucion: string, remuneracion: string) => {
        const nuevoCargo: ICargo = {
            id: 12,
            referencia,
            nivel,
            cantidadCargo: cantidad,
            year,
            institucion,
            remuneracion,


        }
        dispatch({ type: 'Add-Cargo', payload: nuevoCargo });

    }
    const quitarCargo = (id: number) => {
        dispatch({ type: 'Delete-Cargo', payload: id });

    }

    //----------------Capacitaciones---------------------
    const agregarCapacitacion = (titulo: string, horas: string, year: string, institucion: string, descripcion: string) => {
        const nuevoCapacitacion: ICapacitacion = {
            id: 12,
            titulo,
            horas,
            descripcion,
            year,
            institucion,

        }
        dispatch({ type: 'Add-Capacitacion', payload: nuevoCapacitacion });

    }
    const quitarCapacitacion = (id: number) => {
        dispatch({ type: 'Delete-Capacitacion', payload: id });

    }

    //-------------------Reconocimientos---------------------
    const agregarReconocimiento = (reconocimento: string, year: string, institucion: string, descripcion: string) => {
        const nuevoReconocimiento: IReconocimiento = {
            id: 12,
            reconocimento,

            descripcion,
            year,
            institucion,

        }
        dispatch({ type: 'Add-Reconocimiento', payload: nuevoReconocimiento });

    }
    const quitarReconocimiento = (id: number) => {
        dispatch({ type: 'Delete-Reconocimiento', payload: id });

    }

    //-------------------Aficiones---------------------
    const agregarAficion = (actividad: string, year: string, nivel: string, logro: string) => {
        const nuevaAficion: IAficion = {
            id: 12,
            actividad,
            nivel,
            year,
            logro,

        }
        dispatch({ type: 'Add-Aficion', payload: nuevaAficion });

    }
    const quitarAficion = (id: number) => {
        dispatch({ type: 'Delete-Aficion', payload: id });

    }

    //-------------------Tics---------------------
    const agregarTic = (tecnologia: string, nivel: string) => {
        const nuevaTic: ITics = {
            id: 12,
            tecnologia,
            nivel,

        }
        dispatch({ type: 'Add-Tic', payload: nuevaTic });

    }
    const quitarTic = (id: number) => {
        dispatch({ type: 'Delete-Tic', payload: id });

    }





    return (
        <DatosContext.Provider value={{
            ...state,
            activeStep,
            steps,



            handleNext,
            handleBack,
            agregarEstudio,
            quitarEstudio,
            agregarInvestigacion,
            quitarInvestigacion,
            agregarCargo,
            quitarCargo,
            agregarCapacitacion,
            quitarCapacitacion,
            agregarReconocimiento,
            quitarReconocimiento,
            agregarAficion,
            quitarAficion,
            agregarTic,
            quitarTic
        }}>
            {children}

        </DatosContext.Provider>
    )
}