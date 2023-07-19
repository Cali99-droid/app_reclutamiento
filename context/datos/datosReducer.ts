
import { postulante } from '@prisma/client';
import { DatosState } from './DatosProvider';
import { IAficion, ICapacitacion, ICargo, IEstudio, IInvestigacion, IPostulant, IReconocimiento, ITics, IUser } from '@/interfaces';

type DatosType =
    
    | { type: 'Load-doc', payload: string }

    | { type: 'Post - Load', payload: IPostulant }
    | { type: 'Estudios - Load', payload: IEstudio[] }
    | { type: 'Add-Estudio', payload: IEstudio }
    | { type: 'Update-Estudio', payload: IEstudio }
    | { type: 'Delete-Estudio', payload: number }
    
    | { type: 'Investigaciones - Load', payload: IInvestigacion[] }
    | { type: 'Add-Investigacion', payload: IInvestigacion }
    | { type: 'Update-Investigacion', payload: IInvestigacion }
    | { type: 'Delete-Investigacion', payload: number }

    | { type: 'Cargo - Load', payload: ICargo[] }
    | { type: 'Add-Cargo', payload: ICargo }
    | { type: 'Update-Cargo', payload: ICargo }
    | { type: 'Delete-Cargo', payload: number }

    | { type: 'Capacitacion - Load', payload: ICapacitacion[] }
    | { type: 'Add-Capacitacion', payload: ICapacitacion }
    | { type: 'Update-Capacitacion', payload: ICapacitacion }
    | { type: 'Delete-Capacitacion', payload: number }

    | { type: 'Reconocimiento - Load', payload: IReconocimiento[] }
    | { type: 'Add-Reconocimiento', payload: IReconocimiento }
    | { type: 'Update-Reconocimiento', payload: IReconocimiento }
    | { type: 'Delete-Reconocimiento', payload: number }

    | { type: 'Aficion - Load', payload: IAficion[] }
    | { type: 'Add-Aficion', payload: IAficion }
    | { type: 'Update-Aficion', payload: IAficion }
    | { type: 'Delete-Aficion', payload: number }


    | { type: 'Tic-Load', payload: ITics[] }
    | { type: 'Add-Tic', payload: ITics }
    | { type: 'Update-Tic', payload: ITics }
    | { type: 'Delete-Tic', payload: number }

export const datosReducer = (state: DatosState, action: DatosType): DatosState => {

    switch (action.type) {
        case 'Load-doc':
            return {
                ...state,
                docu: action.payload
            }
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
        case 'Update-Estudio':
            return{
                ...state,
                estudios:[...state.estudios.map(e=>{
                    if(e.id === action.payload.id){
                        e.grado = action.payload.grado;
                        e.institucion = action.payload.institucion;
                        e.profesion = action.payload.profesion;
                        e.year = action.payload.year
                        e.doc= action.payload.doc
                    }
                    return e;
                })]
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
        case 'Update-Investigacion':
            return{
                ...state,
                investigaciones:[...state.investigaciones.map(e=>{
                    if(e.id === action.payload.id){
                        e.titulo = action.payload.titulo;
                        e.institucion = action.payload.institucion;
      
                        e.year = action.payload.year

                    }
                    return e;
                })]
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
        case 'Update-Cargo':
            return{
                ...state,
                cargos:[...state.cargos.map(e=>{
                    if(e.id === action.payload.id){
                        e.cantidadCargo = action.payload.cantidadCargo;
                        e.contacto = action.payload.contacto;
                        e.descripcion = action.payload.descripcion;
                        e.institucion = action.payload.institucion;
                        e.nivel = action.payload.nivel;
                        e.referencia = action.payload.referencia;
                        e.remuneracion = action.payload.remuneracion;
                        e.year = action.payload.year;
                        e.doc= action.payload.doc
                    }
                    return e;
                })]
            }
        case 'Delete-Cargo':
            return{
                ...state,
                cargos: state.cargos.filter(c=>c.id !== action.payload)
            }

        case 'Capacitacion - Load':
            return{
                ...state,
                capacitaciones:action.payload
            }
        case 'Add-Capacitacion':
            return{
                ...state,
                capacitaciones:[...state.capacitaciones,action.payload]
            }
        case 'Update-Capacitacion':
            return{
                ...state,
                capacitaciones:[...state.capacitaciones.map(e=>{
                    if(e.id === action.payload.id){
                        e.titulo = action.payload.titulo;
                        e.institucion = action.payload.institucion;
                        e.horas=action.payload.horas
                        e.descripcion=action.payload.descripcion
                        e.year = action.payload.year
                        e.doc= action.payload.doc
                    }
                    return e;
                })]
            }
        case 'Delete-Capacitacion':
            return{
                ...state,
                capacitaciones: state.capacitaciones.filter(c=>c.id !== action.payload)
            }
        case 'Reconocimiento - Load':
            return{
                ...state,
                reconocimientos:action.payload
            }
        case 'Add-Reconocimiento':
            return{
                ...state,
                reconocimientos:[...state.reconocimientos,action.payload]
            }
        case 'Update-Reconocimiento':
            return{
                ...state,
                reconocimientos:[...state.reconocimientos.map(e=>{
                    if(e.id === action.payload.id){
                        e.reconocimento = action.payload.reconocimento;
                        e.institucion = action.payload.institucion;
                        e.descripcion=action.payload.descripcion
                        e.year = action.payload.year
                        e.doc=action.payload.doc
                    }
                    return e;
                })]
            }

        case 'Delete-Reconocimiento':
            return{
                ...state,
                reconocimientos: state.reconocimientos.filter(c=>c.id !== action.payload)
            }
        case 'Aficion - Load':
            return{
                ...state,
                aficiones:action.payload
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
        case 'Update-Aficion':
            return{
                ...state,
                aficiones:[...state.aficiones.map(e=>{
                    if(e.id === action.payload.id){
                        e.actividad = action.payload.actividad;
                        e.logro = action.payload.logro;
                        e.year = action.payload.year;
                        e.nivel = action.payload.nivel;
                    }
                    return e;
                })]
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