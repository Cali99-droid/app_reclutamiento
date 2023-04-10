import { FC, useEffect, useReducer, useState } from 'react';
import { PostContext,postReducer } from './'
import { postulants as listPost, postulants } from '../../database/seedPost';
import { IPostulant } from '@/interfaces';
import confetti from "canvas-confetti";

export interface PostState{
     postulants: IPostulant[];
     isLoaded: boolean;
     fases:string[]
     activeStep:number
}

const POST_INITIAL_STATE: PostState={
      postulants:[],
      isLoaded: false,
      fases:['Preselección', 'Entrevista', 'Evaluación', 'Negociación','Contrato'],
      activeStep:0,
}

 interface Props{
   children: JSX.Element | JSX.Element[]
  }

export const PostProvider:FC<Props> = ({children}) => {

      const [state, dispatch] = useReducer(postReducer, POST_INITIAL_STATE)


      useEffect(() => {
        
            try {
                
                  dispatch({ type: 'Post - Load', payload: listPost })
                  
            } catch (error) {
                  dispatch({ type: 'Post - Load', payload: [] })
            }
      }, [])

      const advancePhase =(postulant:IPostulant)=>{

            const newList = postulants.map((post)=>{
                  if(post.id === postulant.id && postulant.fase<5){
                       post.fase = post.fase +1  
                  }
                  return post;
            })
         
            // console.log(newList)
          
           dispatch({ type: 'Post - Load', payload: newList });
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

      const filteredData = postulants.filter((item) => {
          if (filter === 0) {
          return true;
          } else {
          return item.fase === filter;
          }
      });
  
      /**Gestiona los pasos entre fases */
      const [activeStep, setActiveStep] = useState(0);
      const handleNext = () => {

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
         
            setFilter(activeStep+2);
            if(activeStep===4){
                setFilter(5)
                confetti(  {particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }})
            }
        
          };

      const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            setFilter(activeStep);
      };
      const handleReset = () => {
             setActiveStep(0);
      };
      
      return (
          <PostContext.Provider value={{
            ...state,
            activeStep,
            filteredData,


            //methods
            advancePhase,
            backPhase,
            handleNext,
            handleBack,
            handleReset,

           }}>
                 {children}

          </PostContext.Provider>
    )
}