import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    suiche: false,
    loadDowloadDoc: false,
    graficos:1,
    Interuptor:{
        graficos1: true,
        graficos2: false,
        graficos3: false,
        graficos4: false,
        graficos5: false,
    }
}

const XSlice = createSlice({
    name: 'interuptor',
    initialState,
    reducers: {
        setLoadDownload: (state, action) => {
            state.loadDowloadDoc = action.payload
        },
        setsuiche: (state, action) => {
            state.suiche = action.payload
        },
        setgraficos: (state, action) => {
            state.graficos = action.payload
            if (action.payload === 1) {
                state.Interuptor.graficos1 = true
                state.Interuptor.graficos2 = false
                state.Interuptor.graficos3 = false
                state.Interuptor.graficos4 = false
                state.Interuptor.graficos5 = false
            }
            if (action.payload === 2) {
                state.Interuptor.graficos1 = false
                state.Interuptor.graficos2 = true
                state.Interuptor.graficos3 = false
                state.Interuptor.graficos4 = false
                state.Interuptor.graficos5 = false
            }
            if (action.payload === 3) {
                state.Interuptor.graficos1 = false
                state.Interuptor.graficos2 = false
                state.Interuptor.graficos3 = true
                state.Interuptor.graficos4 = false
                state.Interuptor.graficos5 = false
            }
            if (action.payload === 4) {
                state.Interuptor.graficos1 = false
                state.Interuptor.graficos2 = false
                state.Interuptor.graficos3 = false
                state.Interuptor.graficos4 = true
                state.Interuptor.graficos5 = false
            }
            if (action.payload === 5) {
                state.Interuptor.graficos1 = false
                state.Interuptor.graficos2 = false
                state.Interuptor.graficos3 = false
                state.Interuptor.graficos4 = false
                state.Interuptor.graficos5 = true
            }
        },
    }
})

export default XSlice.reducer
export const { setsuichem, setgraficos, setLoadDownload } = XSlice.actions