import React from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

 
 
const Home = () => {

    return (<>
     
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