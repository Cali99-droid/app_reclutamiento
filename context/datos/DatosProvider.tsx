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
import { reclutApi } from '@/apies';
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
    docu: string;



}

const DATOS_INITIAL_STATE: DatosState = {
    docu: 'doc',
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
    const setCapacitacion = async () => {
        const { data } = await reclutApi.get<ICapacitacion[]>(`/postulants/capacitacion`)

        dispatch({ type: 'Capacitacion - Load', payload: data })

    }
    const setReconocimiento = async () => {
        const { data } = await reclutApi.get<IReconocimiento[]>(`/postulants/reconocimiento`)

        dispatch({ type: 'Reconocimiento - Load', payload: data })

    }
    const setAficion = async () => {
        const { data } = await reclutApi.get<IAficion[]>(`/postulants/aficion`)

        dispatch({ type: 'Aficion - Load', payload: data })

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
    const editarEstudio = async (id: number, profesion: string, institucion: string, grado: string, year: string, idPos: number) => {
        const { data } = await reclutApi.put<IEstudio>('/postulants/estudios', { id, profesion, institucion, grado, year, idPos });

        dispatch({ type: 'Update-Estudio', payload: data });
    }


    const quitarEstudio = async (id: number) => {
        const { data } = await reclutApi.delete<ITics>(`/postulants/estudios/${id}`);
        dispatch({ type: 'Delete-Estudio', payload: id });

    }
    //---------------Investigaciones--------------
    const agregarInvestigacion = async (titulo: string, institucion: string, year: string, idPos: number) => {
        const { data } = await reclutApi.post<IInvestigacion>('/postulants/investigacion', { titulo, institucion, year, idPos });
        dispatch({ type: 'Add-Investigacion', payload: data });

    }
    const editarInvestigacion = async (id: number, titulo: string, institucion: string, year: string, idPos: number) => {
        const { data } = await reclutApi.put<IInvestigacion>('/postulants/investigacion', { id, titulo, institucion, year, idPos });
        dispatch({ type: 'Update-Investigacion', payload: data });

    }
    const quitarInvestigacion = async (id: number) => {
        const { data } = await reclutApi.delete<ITics>(`/postulants/investigacion/${id}`);
        dispatch({ type: 'Delete-Investigacion', payload: id });

    }

    //-------------------Cargos-----------------------
    const agregarCargo = async (referencia: string, contacto: string, nivel: string, cantidadCargo: string, year: string, institucion: string, remuneracion: string, descripcion: string, idPos: number) => {
        const { data } = await reclutApi.post<ICargo>('/postulants/cargo', { referencia, contacto, institucion, nivel, year, cantidadCargo, remuneracion, descripcion, idPos });
        dispatch({ type: 'Add-Cargo', payload: data });

    }
    const editarCargo = async (id: number, referencia: string, contacto: string, nivel: string, cantidadCargo: string, year: string, institucion: string, remuneracion: string, descripcion: string, idPos: number) => {
        const { data } = await reclutApi.put<ICargo>('/postulants/cargo', { id, referencia, contacto, nivel, cantidadCargo, year, institucion, remuneracion, descripcion, idPos });

        dispatch({ type: 'Update-Cargo', payload: data });
    }
    const quitarCargo = async (id: number) => {
        const { data } = await reclutApi.delete<ICargo>(`/postulants/cargo/${id}`);
        dispatch({ type: 'Delete-Cargo', payload: id });

    }

    //----------------Capacitaciones---------------------
    const agregarCapacitacion = async (titulo: string, horas: string, year: string, institucion: string, descripcion: string, idPos: number) => {
        const { data } = await reclutApi.post<ICapacitacion>('/postulants/capacitacion', { titulo, institucion, horas, year, descripcion, idPos });
        dispatch({ type: 'Add-Capacitacion', payload: data });

    }
    const editarCapacitacion = async (id: number, titulo: string, horas: string, year: string, institucion: string, descripcion: string, idPos: number) => {
        const { data } = await reclutApi.put<ICapacitacion>('/postulants/capacitacion', { id, titulo, institucion, horas, year, descripcion, idPos });
        dispatch({ type: 'Update-Capacitacion', payload: data });

    }
    const quitarCapacitacion = async (id: number) => {
        const { data } = await reclutApi.delete<ICargo>(`/postulants/capacitacion/${id}`);
        dispatch({ type: 'Delete-Capacitacion', payload: id });

    }

    //-------------------Reconocimientos---------------------
    const agregarReconocimiento = async (reconocimento: string, year: string, institucion: string, descripcion: string, idPos: number) => {
        const { data } = await reclutApi.post<IReconocimiento>('/postulants/reconocimiento', { reconocimento, institucion, year, descripcion, idPos });
        dispatch({ type: 'Add-Reconocimiento', payload: data });

    }
    const editarReconocimiento = async (id: number, reconocimento: string, year: string, institucion: string, descripcion: string, idPos: number) => {
        const { data } = await reclutApi.put<IReconocimiento>('/postulants/reconocimiento', { id, reconocimento, institucion, year, descripcion, idPos });
        dispatch({ type: 'Update-Reconocimiento', payload: data });

    }
    const quitarReconocimiento = async (id: number) => {
        const { data } = await reclutApi.delete<IReconocimiento>(`/postulants/reconocimiento/${id}`);
        dispatch({ type: 'Delete-Reconocimiento', payload: id });

    }

    //-------------------Aficiones---------------------
    const agregarAficion = async (actividad: string, year: string, nivel: string, logro: string, idPos: number) => {
        const { data } = await reclutApi.post<IAficion>('/postulants/aficion', { actividad, nivel, year, logro, idPos });

        dispatch({ type: 'Add-Aficion', payload: data });

    }

    const editarAficion = async (id: number, actividad: string, year: string, nivel: string, logro: string, idPos: number) => {
        const { data } = await reclutApi.put<IAficion>('/postulants/aficion', { id, actividad, nivel, year, logro, idPos });

        dispatch({ type: 'Update-Aficion', payload: data });

    }
    const quitarAficion = async (id: number) => {
        const { data } = await reclutApi.delete<IAficion>(`/postulants/aficion/${id}`);
        dispatch({ type: 'Delete-Aficion', payload: id });

    }

    //-------------------Tics---------------------

    const agregarTic = async (tecnologia: string, nivel: string, idPos: number) => {

        const { data } = await reclutApi.post<ITics>('/postulants/tic', { tecnologia, nivel, idPos });

        dispatch({ type: 'Add-Tic', payload: data });

    }

    const editarTic = async (id: number, tecnologia: string, nivel: string, idPos: number) => {

        const { data } = await reclutApi.put<ITics>('/postulants/tic', { id, tecnologia, nivel, idPos });

        dispatch({ type: 'Update-Tic', payload: data });

    }
    const quitarTic = async (id: number) => {
        const { data } = await reclutApi.delete<ITics>(`/postulants/tic/${id}`);
        dispatch({ type: 'Delete-Tic', payload: id });

    }

    //-------------DOCUMENTO

    const subirDoc = async (doc: string, id: number) => {
        const { data } = await reclutApi.post<any>('/postulants/document', { doc, id });
        console.log(data)
    }

    const doc = async () => {

        const { data } = await reclutApi.get<string>('/postulants/document');

        dispatch({ type: 'Load-doc', payload: data });

    }



    return (
        <DatosContext.Provider value={{
            ...state,
            activeStep,
            steps,

            setPos,
            doc,


            handleNext,
            handleBack,

            setEstudios,
            agregarEstudio,
            editarEstudio,
            quitarEstudio,

            setInvestigaciones,
            agregarInvestigacion,
            editarInvestigacion,
            quitarInvestigacion,

            setCargos,
            agregarCargo,
            editarCargo,
            quitarCargo,

            setCapacitacion,
            agregarCapacitacion,
            editarCapacitacion,
            quitarCapacitacion,

            setReconocimiento,
            agregarReconocimiento,
            editarReconocimiento,
            quitarReconocimiento,

            setAficion,
            agregarAficion,
            editarAficion,
            quitarAficion,

            setTic,
            agregarTic,
            editarTic,
            quitarTic,

            subirDoc

        }}>
            {children}

        </DatosContext.Provider>
    )
}