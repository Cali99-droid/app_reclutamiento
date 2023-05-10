import { IAficion, ICapacitacion, ICargo, IEstudio, IInvestigacion, IPostulant, IReconocimiento, ITics, IUser } from '@/interfaces';
import { postulante } from '@prisma/client';
import { createContext } from 'react';


interface ContextProps {
    prop: boolean;
    pos?: IPostulant;
    docu: any
    estudios: IEstudio[];
    investigaciones: IInvestigacion[];
    cargos: ICargo[];
    capacitaciones: ICapacitacion[];
    reconocimientos: IReconocimiento[];
    tecnologias: ITics[]
    aficiones: IAficion[];
    activeStep: number
    steps: {
        label: string;
        content: JSX.Element;
        icon: any
    }[]

    setPos: () => Promise<void>
    doc: () => Promise<void>
    handleNext: () => void,
    handleBack: () => void


    setEstudios: () => Promise<void>
    agregarEstudio: (profesion: string, institucion: string, grado: string, year: string, idPos: number) => void
    quitarEstudio: (id: number) => void,


    setInvestigaciones: () => Promise<void>
    agregarInvestigacion: (nombre: string, institucion: string, year: string, idPos: number) => void
    quitarInvestigacion: (id: number) => void


    setCargos: () => Promise<void>
    agregarCargo: (referencia: string, contacto: string, nivel: string, cantidadCargo: string, year: string, institucion: string, remuneracion: string, descripcion: string, idPos: number) => void
    quitarCargo: (id: number) => void


    setCapacitacion: () => Promise<void>
    agregarCapacitacion: (titulo: string, horas: string, year: string, institucion: string, descripcion: string, idPos: number) => void
    quitarCapacitacion: (id: number) => void


    setReconocimiento: () => Promise<void>
    agregarReconocimiento: (reconocimento: string, year: string, institucion: string, descripcion: string, idPos: number) => void
    quitarReconocimiento: (id: number) => void


    setAficion: () => Promise<void>
    agregarAficion: (actividad: string, year: string, nivel: string, logro: string, idPos: number) => void
    quitarAficion: (id: number) => void,


    setTic: () => Promise<void>
    agregarTic: (tecnologia: string, nivel: string, idPos: number) => void
    quitarTic: (id: number) => void

    subirDoc: (doc: string, id: number) => Promise<void>
}
export const DatosContext = createContext({} as ContextProps);