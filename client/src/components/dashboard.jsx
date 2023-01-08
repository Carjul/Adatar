import { Nav } from './Nav';
/* import {  useSelector,  useDispatch } from 'react-redux';
import { getData } from '../app/Actions/action'; */
import Sidebar from './sidebar';
import Footer from './footer';

export const Dashboard =()=>{
    return (
    <>
        <Nav />
    <div className='flex flex-row justify-content-around'>
    <Sidebar props={4}/>
     <div>
        dashboard aqui
     </div>

    </div>
   <Footer/>
   
   </>
    )
}