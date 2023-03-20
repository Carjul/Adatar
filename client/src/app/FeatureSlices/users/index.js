import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    auth0data:{},
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
        },
        setData:(state, action)=>{
            state.auth0data=action.payload
        }
    }
})

export default userSlice.reducer
export const { setUsers, setConfig,setData } = userSlice.actions