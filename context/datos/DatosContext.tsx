import { ICapacitacion, ICargo, IEstudio, IInvestigacion, IReconocimiento } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
    prop: boolean;
    estudios: IEstudio[];
    investigaciones: IInvestigacion[];
    cargos: ICargo[];
    capacitaciones: ICapacitacion[];
    reconocimientos: IReconocimiento[];
    activeStep: number
    steps: {
        label: string;
        content: JSX.Element;
    }[]


    handleNext: () => void,
    handleBack: () => void
    agregarEstudio: (profesion: string, institucion: string, grado: string, year: string) => void
    quitarEstudio: (id: number) => void
    agregarInvestigacion: (nombre: string, institucion: string, year: string) => void
    quitarInvestigacion: (id: number) => void
    agregarCargo: (referencia: string, nivel: string, cantidad: string, year: string, institucion: string, remuneracion: string) => void
    quitarCargo: (id: number) => void
    agregarCapacitacion: (titulo: string, horas: string, year: string, institucion: string, descripcion: string) => void
    quitarCapacitacion: (id: number) => void
    agregarReconocimiento: (reconocimento: string, year: string, institucion: string, descripcion: string) => void
    quitarReconocimiento: (id: number) => void
}
export const DatosContext = createContext({} as ContextProps);