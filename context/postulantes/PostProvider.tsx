import { FC, useEffect, useReducer, useState } from 'react';
import { PostContext,postReducer } from './'
import { postulants } from '../../database/seedPost';
import { IPostulant } from '@/interfaces';
import confetti from "canvas-confetti";


export interface PostState{
     postulants: IPostulant[];
     isLoaded: boolean;
   
     activeStep:number;
    
}

const POST_INITIAL_STATE: PostState={
      postulants: [],
      isLoaded: false,
      activeStep: 0,
      
}

 interface Props{
   children: JSX.Element | JSX.Element[]
  }
//TODO Validar Vacantes
export const PostProvider:FC<Props> = ({children}) => {

      const [state, dispatch] = useReducer(postReducer, POST_INITIAL_STATE)


      useEffect(() => {
        
            try {
                
                  dispatch({ type: 'Post - Load', payload: postulants })
                  
            } catch (error) {
                  dispatch({ type: 'Post - Load', payload: [] })
            }
      }, [])

   

     

      const marcarApto = (postulant:IPostulant)=>{
            
            postulant.apto=true; 
         verificarVacio()
      }

      const quitarApto = (postulant:IPostulant)=>{
            

            postulant.apto=false; 
            verificarVacio()
      }


     

      const backPhase =(postulant:IPostulant)=>{

            const newList = postulants.map((post)=>{
                  if(post.id === postulant.id && postulant.fase>1){
                       post.fase = post.fase -1  
                  }
                  return post;
            })
         
           dispatch({ type: 'Post - Load', payload: newList });
      }

      /**Filtra los datos segun la fase */
      const [filter, setFilter] = useState(1);
      const [empty, setEmpty] = useState(true);
    

      const filteredData = postulants.filter((post) => {
          
          if (filter === 0) { 
          return true;
          } else {  
         
          return post.fase === filter;
        
          }

      });

      const verificarVacio = ()=>{
            const data = postulants.filter((post) => {
                  return post.apto === true;

            })
console.log(data)
            if(data.length > 0){
                  setEmpty(false)
            }else{
                  setEmpty(true)
            }
      }


      

      const finalizarFase = ()=>{
        
            const newList =  postulants.map((post)=>{
                  if(post.apto){
                        post.fase = post.fase +1  
                        post.apto = false
                   }
                   return post;
            })
  
            dispatch({ type: 'Post - Load', payload: newList });
      }
  
  
      /**Gestiona los pasos entre fases */
      const [activeStep, setActiveStep] = useState(0);
      const [contrato, setContrato] = useState(false)
      const handleNext = () => {  
     
            
            if(activeStep===4 && filteredData.length !==0 ){
            finalizarFase()
            verificarVacio()
            setFilter(6)
            setContrato(true)
            confetti(  {particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }})
                 
            }  
              finalizarFase()
              verificarVacio()
                  setFilter(activeStep+2);
                  setActiveStep((prevActiveStep) => prevActiveStep + 1);  
        
                
        
          };

      const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            setFilter(activeStep);
      };
      const handleReset = () => {
             setActiveStep(0);
      };

   

      /**Modales */
      const [openAdvance, setOpenAdvance] = useState(false);

      const handleClickOpenAdvance = () => {
            setOpenAdvance(true);
      };

      const handleCloseAdvance = () => {
            setOpenAdvance(false);
      };




  

    
      
      return (
          <PostContext.Provider value={{
            ...state,
            activeStep,
             filteredData,
            contrato,
            openAdvance,
            postulants,
            empty,
        
           
            //methods
            marcarApto,
            quitarApto,
            verificarVacio,
            backPhase,
            handleNext,
            handleBack,
            handleReset,
            handleClickOpenAdvance,
            handleCloseAdvance


           }}>
                 {children}

          </PostContext.Provider>
    )
}