
import { DatosState } from './DatosProvider';
import { ICapacitacion, ICargo, IEstudio, IInvestigacion, IPostulant, IReconocimiento } from '@/interfaces';

type DatosType =
    | { type: 'Post - Load', payload: IPostulant[] }
    | { type: 'Add-Estudio', payload: IEstudio }
    | { type: 'Delete-Estudio', payload: number }
    | { type: 'Add-Investigacion', payload: IInvestigacion }
    | { type: 'Delete-Investigacion', payload: number }
    | { type: 'Add-Cargo', payload: ICargo }
    | { type: 'Delete-Cargo', payload: number }
    | { type: 'Add-Capacitacion', payload: ICapacitacion }
    | { type: 'Delete-Capacitacion', payload: number }
    | { type: 'Add-Reconocimiento', payload: IReconocimiento }
    | { type: 'Delete-Reconocimiento', payload: number }

export const datosReducer = (state: DatosState, action: DatosType): DatosState => {

    switch (action.type) {
        case 'Post - Load':
            return {
                ...state,
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
        
        default:
            return state;
    }
}    