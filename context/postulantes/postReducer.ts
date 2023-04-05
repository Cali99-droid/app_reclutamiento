import { PostState } from './PostProvider';
   type PostType = 
   |{type:'Post - Filter'}
   
    export const postReducer =(state:PostState,action:PostType):PostState=>{

       switch (action.type) {
           case 'Post - Filter':
                   return{
                         ...state,
                         }
           default:
                   return state;
       }    
   }    