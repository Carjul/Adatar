import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    data: [],
    oneData: {}
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        setOneData: (state, action) => {
            state.oneData = action.payload
        }
    }
})

export default dataSlice.reducer
export const { setData, setOneData } = dataSlice.actions