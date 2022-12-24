import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    massage:{

    }
}

const msgSlice = createSlice({
    name: 'msg',
    initialState,
    reducers: {
        setMsg: (state, action) => {
            state.massage = action.payload
        }
    }
})

export default msgSlice.reducer
export const {setMsg } = msgSlice.actions