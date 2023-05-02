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






export interface DatosState {
    prop: boolean,
    estudios: IEstudio[]
    investigaciones: IInvestigacion[]
    cargos: ICargo[]
    capacitaciones: ICapacitacion[]
    reconocimientos: IReconocimiento[]
    aficiones: IAficion[]
    tecnologias: ITics[]
    pos: postulante
    idPos: number



}

const DATOS_INITIAL_STATE: DatosState = {
    prop: false,
    idPos: 0,
    pos: {
        id: 0,
        telefono: '',
        direccion: '',
        experiencia: 2,
        especialidad: '',
        nacimiento: new Date(),
        numeroDocumento: '',
        sueldo: 0,
        tipoId: 0,
        gradoId: 0,
        persona_id: 0,
    },
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
        { label: 'Paso 1', content: <Step1 /> },
        { label: 'Paso 2', content: <Step2 /> },
        { label: 'Paso 3', content: <Step3 /> },
        { label: 'Paso 4', content: <Step4 /> },
        { label: 'Paso 5', content: <Step5 /> },
    ];
    const setPos = async () => {
        const { data } = await reclutApi.get<postulante>(`/postulants/`)
        dispatch({ type: 'Post - Load', payload: data })
    }
    const setTic = async () => {
        const { data } = await reclutApi.get<ITics[]>(`/postulants/tic`)

        dispatch({ type: 'Tic-Load', payload: data })

    }

    const { data }: any = useSession();
    const [IdPos, setIdPos] = useState(data?.user.persona.postulante[0].id)
    useEffect(() => {

        //  setPos();
        // setTic()

    }, [])





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
            setTic,
            agregarTic,
            quitarTic,

        }}>
            {children}

        </DatosContext.Provider>
    )
}