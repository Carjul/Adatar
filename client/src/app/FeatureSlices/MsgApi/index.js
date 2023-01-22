import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    message:{

    },
    swich:false
}

const msgSlice = createSlice({
    name: 'msg',
    initialState,
    reducers: {
        setMsg: (state, action) => {
            state.message = action.payload
        },
        setSwich:(state,action)=>{
            state.swich=action.payload
        }
    }
})

export default msgSlice.reducer
export const {setMsg,setSwich } = msgSlice.actions