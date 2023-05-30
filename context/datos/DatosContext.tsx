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
    editarEstudio: (id: number, profesion: string, institucion: string, grado: string, year: string, idPos: number) => Promise<void>
    quitarEstudio: (id: number) => void,


    setInvestigaciones: () => Promise<void>
    agregarInvestigacion: (nombre: string, institucion: string, year: string, idPos: number) => void
    editarInvestigacion: (id: number, titulo: string, institucion: string, year: string, idPos: number) => Promise<void>
    quitarInvestigacion: (id: number) => void


    setCargos: () => Promise<void>
    agregarCargo: (referencia: string, contacto: string, nivel: string, cantidadCargo: string, year: string, institucion: string, remuneracion: string, descripcion: string, idPos: number) => void,
    editarCargo: (id: number, referencia: string, contacto: string, nivel: string, cantidadCargo: string, year: string, institucion: string, remuneracion: string, descripcion: string, idPos: number) => Promise<void>
    quitarCargo: (id: number) => void


    setCapacitacion: () => Promise<void>
    agregarCapacitacion: (titulo: string, horas: string, year: string, institucion: string, descripcion: string, idPos: number) => void,
    editarCapacitacion: (id: number, titulo: string, horas: string, year: string, institucion: string, descripcion: string, idPos: number) => Promise<void>
    quitarCapacitacion: (id: number) => void


    setReconocimiento: () => Promise<void>
    agregarReconocimiento: (reconocimento: string, year: string, institucion: string, descripcion: string, idPos: number) => void
    editarReconocimiento: (id: number, reconocimento: string, year: string, institucion: string, descripcion: string, idPos: number) => Promise<void>
    quitarReconocimiento: (id: number) => void


    setAficion: () => Promise<void>
    agregarAficion: (actividad: string, year: string, nivel: string, logro: string, idPos: number) => void
    editarAficion: (id: number, actividad: string, year: string, nivel: string, logro: string, idPos: number) => Promise<void>
    quitarAficion: (id: number) => void,


    setTic: () => Promise<void>
    agregarTic: (tecnologia: string, nivel: string, idPos: number) => void
    editarTic: (id: number, tecnologia: string, nivel: string, idPos: number) => Promise<void>
    quitarTic: (id: number) => void

    subirDoc: (doc: string, id: number) => Promise<void>
}
export const DatosContext = createContext({} as ContextProps);