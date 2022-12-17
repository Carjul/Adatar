import axios from "axios";
import {setData} from '../FeatureSlices/data';

export const getData = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/data');
        dispatch(setData(data));
    } catch (error) {
        console.log(error);
    }
}