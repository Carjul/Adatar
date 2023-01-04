import React, { useEffect } from 'react';
import { Nav } from './Nav';
import {  useSelector,  useDispatch } from 'react-redux';
import { getData } from '../app/Actions/action';
import Sidebar from './sidebar';
import GraficoPolar from './Grafico';




const Home = () => {
  const datos = useSelector(state => state.data);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  console.log(datos)
  
 /*  console.log(datos.programa);
  const perdio = datos.notas.filter((e) => e.Perdio===1);
  console.log(perdio)
  perdio.length > 0?  perdio.forEach((e) => console.log(datos.programa.find((i) => i.id === e.ProgramaId)) ) : console.log("no hay perdidos")
 
   */
 
  useEffect(() => {
    dispatch(getData(token));
  }, [dispatch,token]);


   
  return (<>
     
       <Nav />
       <div className='flex flex-row justify-content-around'>
       <Sidebar props={1}/>
        <GraficoPolar/>
  
       </div>
      
  

  </>
   
  );
}

export default Home; 