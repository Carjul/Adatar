import React from 'react';
import { Nav } from './Nav';
import Sidebar from './sidebar';
import Footer from './footer';
import GraficoPolar from './Grafico';




const Home = () => {
 
  
 /*  console.log(datos.programa);
  const perdio = datos.notas.filter((e) => e.Perdio===1);
  console.log(perdio)
  perdio.length > 0?  perdio.forEach((e) => console.log(datos.programa.find((i) => i.id === e.ProgramaId)) ) : console.log("no hay perdidos")
 
   */
 
   
  return (<>
     
       <Nav />
       <div className='flex flex-row justify-content-around'>
       <Sidebar props={1}/>
        <GraficoPolar/>
  
       </div>
      <Footer/>
  

  </>
   
  );
}

export default Home; 