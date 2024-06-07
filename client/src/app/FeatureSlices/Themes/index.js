import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    theme:'cmyk',
    navState:"close"
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setnavState: (state, action) => {
            state.navState = action.payload
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export default themeSlice.reducer
export const {setTheme, setnavState } = themeSlice.actions