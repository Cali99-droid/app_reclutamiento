
import { postulante } from '@prisma/client';
import { DatosState } from './DatosProvider';
import { IAficion, ICapacitacion, ICargo, IEstudio, IInvestigacion, IPostulant, IReconocimiento, ITics, IUser } from '@/interfaces';

type DatosType =
    
    | { type: 'Post - Load', payload: IPostulant }
    | { type: 'Estudios - Load', payload: IEstudio[] }
    | { type: 'Add-Estudio', payload: IEstudio }
    | { type: 'Delete-Estudio', payload: number }
    | { type: 'Investigaciones - Load', payload: IInvestigacion[] }
    | { type: 'Add-Investigacion', payload: IInvestigacion }
    | { type: 'Delete-Investigacion', payload: number }
    | { type: 'Cargo - Load', payload: ICargo[] }
    | { type: 'Add-Cargo', payload: ICargo }
    | { type: 'Delete-Cargo', payload: number }
    | { type: 'Add-Capacitacion', payload: ICapacitacion }
    | { type: 'Delete-Capacitacion', payload: number }
    | { type: 'Add-Reconocimiento', payload: IReconocimiento }
    | { type: 'Delete-Reconocimiento', payload: number }
    | { type: 'Add-Aficion', payload: IAficion }
    | { type: 'Delete-Aficion', payload: number }
    | { type: 'Tic-Load', payload: ITics[] }
    | { type: 'Add-Tic', payload: ITics }
    | { type: 'Delete-Tic', payload: number }

export const datosReducer = (state: DatosState, action: DatosType): DatosState => {

    switch (action.type) {
        case 'Post - Load':
            return {
                ...state,
                pos: action.payload
            }
        case 'Tic-Load':
            return {
                ...state,
                tecnologias:action.payload
            }
        case 'Estudios - Load':
        return{
            ...state,

            estudios: action.payload
        }
        case 'Add-Estudio':
            return{
                ...state,

                estudios:[...state.estudios, action.payload]
            }
        case 'Delete-Estudio':
            return{
                ...state,

                estudios: state.estudios.filter(e =>e.id !== action.payload)
            }
        case 'Investigaciones - Load':
            return{
                ...state,
    
                investigaciones: action.payload
            }
        
        case 'Add-Investigacion':
            return{
                ...state,
                investigaciones:[...state.investigaciones,action.payload]
            }
        case 'Delete-Investigacion':
            return{
                ...state,
                investigaciones: state.investigaciones.filter(i=>i.id !== action.payload)
            }

            case 'Cargo - Load':
                return{
                    ...state,
        
                    cargos: action.payload
                }
        
        case 'Add-Cargo':
            return{
                ...state,
                cargos:[...state.cargos,action.payload]
            }

        case 'Delete-Cargo':
            return{
                ...state,
                cargos: state.cargos.filter(c=>c.id !== action.payload)
            }
        case 'Add-Capacitacion':
            return{
                ...state,
                capacitaciones:[...state.capacitaciones,action.payload]
            }
        case 'Delete-Capacitacion':
            return{
                ...state,
                capacitaciones: state.capacitaciones.filter(c=>c.id !== action.payload)
            }
        case 'Add-Reconocimiento':
            return{
                ...state,
                reconocimientos:[...state.reconocimientos,action.payload]
            }

        case 'Delete-Reconocimiento':
            return{
                ...state,
                reconocimientos: state.reconocimientos.filter(c=>c.id !== action.payload)
            }
        case 'Add-Aficion':
            return{
                ...state,
                aficiones:[...state.aficiones,action.payload]
            }

        case 'Delete-Aficion':
            return{
                ...state,
                aficiones: state.aficiones.filter(c=>c.id !== action.payload)
            }
        case 'Add-Tic':
            return{
                ...state,
                tecnologias:[...state.tecnologias,action.payload]
            }

        case 'Delete-Tic':
            return{
                ...state,
                tecnologias: state.tecnologias.filter(c=>c.id !== action.payload)
            }
          
        default:
            return state;
        
    }
}    