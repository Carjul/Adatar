import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {},
    config:[]
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.user = action.payload
        },
        setConfig:(state, action)=>{
            state.config=action.payload
        }
    }
})

export default userSlice.reducer
export const { setUsers, setConfig } = userSlice.actions