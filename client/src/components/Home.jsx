import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData,getOneData } from '../app/Actions/action';
import * as echarts from 'echarts';



const Home = () => {
    const user = useSelector(state => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
        dispatch(getOneData(1));
    },[dispatch]);
    console.log(user);
    return (
        <div>
        <h1>Home</h1>
      
        </div>
    );
}

export default Home; 