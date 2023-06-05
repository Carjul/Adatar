import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    suiche: false,
}

const XSlice = createSlice({
    name: 'interuptor',
    initialState,
    reducers: {
        setsuiche: (state, action) => {
            state.suiche = action.payload
        }
    }
})

export default XSlice.reducer
export const {setsuiche } = XSlice.actions