import { UIState } from './UiProvider';
   type uiType = 
   |{type:'[UI] - ToggleMenu'}
   
    export const uiReducer =(state:UIState,action:uiType):UIState=>{

       switch (action.type) {
           case '[UI] - ToggleMenu':
                   return{
                         ...state,
                         isMenuOpen: !state.isMenuOpen
                         }
           default:
                   return state;
       }    
   }    