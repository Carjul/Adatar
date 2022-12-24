import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    message:{

    }
}

const msgSlice = createSlice({
    name: 'msg',
    initialState,
    reducers: {
        setMsg: (state, action) => {
            state.message = action.payload
        }
    }
})

export default msgSlice.reducer
export const {setMsg } = msgSlice.actions