import React from 'react';
import { Nav } from './Nav';
import Sidebar from './sidebar';
import Footer from './footer';
import GraficoPolar from './Grafico';




const Home = () => {
 

 
   
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