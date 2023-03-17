import React from 'react';
import Nav from '@/components/Nav';
import Sidebar from '@/components/sidebar';
import Footer from '@/components/footer';
import PrivateRoute from '@/components/proteccion';
 
 
const Home = () => {

    return (<>
        <PrivateRoute />
     
        <Nav />
        <div className='flex flex-row justify-content-around'>
            <Sidebar props={1} />
            <p></p>

        </div>
        <Footer />


    </>

    );
}

export default Home; 