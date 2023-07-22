import { FC, useEffect, useReducer, useState, useContext } from 'react';
import { PostContext, postReducer } from './'

import { IPostulant } from '@/interfaces';
import confetti from "canvas-confetti";
import { reclutApi } from '@/apies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { AuthContext } from '../auth';
import { useSession } from 'next-auth/react';

export interface PostState {
      postulants: IPostulant[];
      isLoaded: boolean;
      criterios: any;
      juradosAsignados: any;

}

const POST_INITIAL_STATE: PostState = {
      postulants: [],
      isLoaded: false,
      criterios: [],
      juradosAsignados: []

}

interface Props {
      children: JSX.Element | JSX.Element[]
}

export const PostProvider: FC<Props> = ({ children }) => {

      const [state, dispatch] = useReducer(postReducer, POST_INITIAL_STATE)
      const criterios = new Map()
      const router = useRouter();
      const { id } = router.query
      const [total, setTotal] = useState(0)
      const addNewJurado = async (jurado: string) => {

            const { data } = await reclutApi.post('/admin/asignar/jurado', { id, jurado });
            // console.log(data)
            if (!data.message) {
                  dispatch({ type: '[jurados] Add-Jurado', payload: data.juradoNew })
                  return;
            }

            return data.message


      }
      const deleteJurado = async (idJurado: number) => {
            try {
                  reclutApi({
                        url: `/admin/asignar/${id}`,
                        method: 'DELETE',
                        data: idJurado
                  }).then(() => {
                        dispatch({ type: '[jurado] jurado-DELETE', payload: idJurado })
                        // refreshJurados()
                  });




            } catch (error) {
                  console.log(error)
            }

      }

      const refreshJurados = async () => {
            const { data } = await reclutApi.get<any>(`/admin/asignar/${id}`)
            dispatch({ type: '[jurados] REFRESH-Data', payload: data })

      }



      const calcularTotal = () => {
            let total = 0;
            for (var [key, value] of criterios) {
                  total += value;
            }

            return total
      }

      const limpiarCriterios = () => {
            criterios.clear()
      }



      const { user } = useContext(AuthContext)




      //-----EValuaciones

      const [idEv, setIdEv] = useState<string | number>('');
      const [idPos, setIdPos] = useState<string | number>('');
      const [openClase, setOpenClase] = useState(false)

      const handleOpenClase = (id: number) => {

            if (user?.rol_id === 3) {
                  setOpenClase(true);
            }

            if (user?.rol_id === 4) {
                  setOpenAptitud(true);
            }

            setOpenClase(true);
            setIdPos(id)
            setIdEv(2)
      };

      const handleCloseClase = () => {
            setOpenClase(false);

      };

      const { data }: any = useSession();
      // ** console.log(data?.user.persona.postulante[0].id);
      const idUser = data?.user.id

      const handleConfirmClase = async () => {
            //TODO validar actualizacion o creacion  */


            const puntaje = calcularTotal();


            try {

                  const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPos, idEv, max: 100, idUser });

                  toast.success('🦄 Puntaje asignado correctamente0!'),
                        handleCloseClase()
                  limpiarCriterios()

            } catch (error) {

                  console.log(error);
                  alert('El postulante ya tiene puntaje');
            }

      };

      //-------------------------------------------------------------------
      const [openAptitud, setOpenAptitud] = useState(false)
      const handleOpenAptitud = (id: number) => {
            setOpenAptitud(true);
            setIdPos(id)
            setIdEv(2)
      };

      const handleCloseAptitud = () => {
            setOpenAptitud(false);
      };
      const handleConfirmAptitud = async () => {
            //TODO validar actualizacion o creacion  */


            const puntaje = calcularTotal();
            // console.log(puntaje)

            try {

                  const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPos, idEv, max: 100, idUser });

                  toast.success('🦄 Puntaje asignado correctamente!'),
                        handleCloseAptitud()
                  limpiarCriterios()

            } catch (error) {

                  console.log(error);
                  alert('El postulante ya tiene puntaje');
            }





      };






      return (
            <PostContext.Provider value={{
                  ...state,
                  criterios,
                  calcularTotal,
                  limpiarCriterios,
                  idUser,
                  total,
                  idPos,
                  //Modales
                  handleOpenClase,
                  openClase,
                  handleCloseClase,
                  handleConfirmClase,

                  openAptitud,
                  handleOpenAptitud,
                  handleCloseAptitud,
                  handleConfirmAptitud,

                  refreshJurados,
                  addNewJurado,
                  deleteJurado
            }}>
                  {children}

            </PostContext.Provider>
      )
}