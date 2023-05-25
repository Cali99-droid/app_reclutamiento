
import { PostState } from './PostProvider';
import { IPostulant } from '@/interfaces';

   type PostType = 
   |{type:'Post - Load',payload:IPostulant[]}
   |{type:'Post - update phase postulant', payload:IPostulant[]}
   |{type:'[jurados] REFRESH-Data', payload:any[]}
   |{type:'[jurados] Add-Jurado', payload:any}
   |{type:'[jurado] jurado-DELETE', payload:any}
   
    export const postReducer =(state:PostState,action:PostType):PostState=>{

       switch (action.type) {
           case 'Post - Load':
                   return{
                         ...state,
                         isLoaded:true,
                         postulants:[...action.payload],
                        
                         }
            case '[jurados] REFRESH-Data':
            return{
                    ...state,
                  
                    juradosAsignados:[...action.payload],
                    
                    }
            case '[jurados] Add-Jurado':
                return{
                        ...state,
                        
                        juradosAsignados:[...state.juradosAsignados, action.payload]
                        
                        }

            case '[jurado] jurado-DELETE':
                return{
                        ...state,
                        
                        juradosAsignados: state.juradosAsignados.filter((e: { id: any; }) =>e.id !== action.payload)
                        
                        }
            // case 'Post - update phase postulant':
            //     return{
            //         ...state,
            //         isLoaded:true,
            //         postulants:[...action.payload],
            //     }
           default:
                   return state;
       }    
   }    