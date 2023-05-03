import { FC, useReducer, useState, useContext, useEffect } from 'react';
import { DatosContext, datosReducer } from './';
import Step1 from '@/components/pasos/Step1';
import Step3 from '@/components/pasos/Step3';
import Step4 from '@/components/pasos/Step4';
import Step5 from '@/components/pasos/Step5';
import Step2 from '@/components/pasos/Step2';
import { IAficion, ICapacitacion, ICargo, IEstudio, IInvestigacion, IPostulant, IReconocimiento, ITics, IUser, } from '@/interfaces';

import { SessionContextValue, getSession, useSession } from 'next-auth/react';
import { AuthContext } from '../auth';
import { reclutApi } from '@/api';
import { postulante, user } from '@prisma/client';
import { prisma } from '@/server/db/client';
import { Session } from 'next-auth';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';

export interface DatosState {
    prop: boolean,
    estudios: IEstudio[]
    investigaciones: IInvestigacion[]
    cargos: ICargo[]
    capacitaciones: ICapacitacion[]
    reconocimientos: IReconocimiento[]
    aficiones: IAficion[]
    tecnologias: ITics[]
    pos?: IPostulant
    idPos: number



}

const DATOS_INITIAL_STATE: DatosState = {
    prop: false,
    idPos: 0,
    pos: undefined,
    estudios: [],
    investigaciones: [],
    cargos: [],
    capacitaciones: [],
    reconocimientos: [],
    aficiones: [],
    tecnologias: []
}

interface Props {
    children: JSX.Element | JSX.Element[]

}

export const DatosProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(datosReducer, DATOS_INITIAL_STATE)

    const steps = [
        { label: 'Datos personales', content: <Step1 />, icon: <ContactPageIcon sx={{ color: '#EECA73' }} /> },
        { label: 'Formación', content: <Step2 />, icon: <SchoolIcon sx={{ color: '#EECA73' }} /> },
        { label: 'Experiencia', content: <Step3 />, icon: <WorkIcon sx={{ color: '#EECA73' }} /> },
        { label: 'Cursos / Capacitaciones', content: <Step4 />, icon: <MilitaryTechIcon sx={{ color: '#EECA73' }} /> },
        { label: 'Otras Actividades', content: <Step5 />, icon: <NaturePeopleIcon sx={{ color: '#EECA73' }} /> },
    ];
    const setPos = async () => {
        const { data } = await reclutApi.get<IPostulant>(`/postulants/`)
        dispatch({ type: 'Post - Load', payload: data })
    }
    const setTic = async () => {
        const { data } = await reclutApi.get<ITics[]>(`/postulants/tic`)

        dispatch({ type: 'Tic-Load', payload: data })

    }
    const setEstudios = async () => {
        const { data } = await reclutApi.get<IEstudio[]>(`/postulants/estudios`)

        dispatch({ type: 'Estudios - Load', payload: data })

    }
    const setInvestigaciones = async () => {
        const { data } = await reclutApi.get<IInvestigacion[]>(`/postulants/investigacion`)

        dispatch({ type: 'Investigaciones - Load', payload: data })

    }
    const setCargos = async () => {
        const { data } = await reclutApi.get<ICargo[]>(`/postulants/cargo`)

        dispatch({ type: 'Cargo - Load', payload: data })

    }

    // const { data }: any = useSession();
    // const [IdPos, setIdPos] = useState(data?.user.persona.postulante[0].id)
    // useEffect(() => {

    //     //  setPos();
    //     // setTic()

    // }, [])





    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {

        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    //-----------------estudios..................
    const agregarEstudio = async (profesion: string, institucion: string, grado: string, year: string, idPos: number) => {
        const { data } = await reclutApi.post<IEstudio>('/postulants/estudios', { profesion, institucion, grado, year, idPos });
        // const nuevoEstudio: IEstudio = {
        //     id: 0,
        //     profesion,
        //     institucion,
        //     grado,
        //     year
        // }
        dispatch({ type: 'Add-Estudio', payload: data });
    }
    const quitarEstudio = async (id: number) => {
        const { data } = await reclutApi.delete<ITics>(`/postulants/estudios/${id}`);
        dispatch({ type: 'Delete-Estudio', payload: id });

    }
    //---------------Investigaciones--------------
    const agregarInvestigacion = async (titulo: string, institucion: string, year: string, idPos: number) => {
        const { data } = await reclutApi.post<IInvestigacion>('/postulants/investigacion', { titulo, institucion, year, idPos });
        // const nuevaInvestigacion: IInvestigacion = {
        //     id: 12,
        //     titulo,
        //     year,
        //     institucion
        // }
        dispatch({ type: 'Add-Investigacion', payload: data });

    }
    const quitarInvestigacion = async (id: number) => {
        const { data } = await reclutApi.delete<ITics>(`/postulants/investigacion/${id}`);
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

    const agregarTic = async (tecnologia: string, nivel: string, idPos: number) => {

        const { data } = await reclutApi.post<ITics>('/postulants/tic', { tecnologia, nivel, idPos });
        // const nuevaTic: ITics = {
        //     id: 12,
        //     tecnologia,
        //     nivel,

        // }
        dispatch({ type: 'Add-Tic', payload: data });

    }
    const quitarTic = async (id: number) => {
        const { data } = await reclutApi.delete<ITics>(`/postulants/tic/${id}`);
        dispatch({ type: 'Delete-Tic', payload: id });

    }





    return (
        <DatosContext.Provider value={{
            ...state,
            activeStep,
            steps,

            setPos,

            handleNext,
            handleBack,
            setEstudios,
            agregarEstudio,
            quitarEstudio,
            setInvestigaciones,
            agregarInvestigacion,
            quitarInvestigacion,
            setCargos,
            agregarCargo,
            quitarCargo,
            agregarCapacitacion,
            quitarCapacitacion,
            agregarReconocimiento,
            quitarReconocimiento,
            agregarAficion,
            quitarAficion,
            setTic,
            agregarTic,
            quitarTic,

        }}>
            {children}

        </DatosContext.Provider>
    )
}