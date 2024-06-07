import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    auth0data:{},
    user: {},
    config:[],
    roles:[]
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setRoles: (state, action) => {
            if(action.payload){

                state.roles = action.payload
            }

        },
        setUsers: (state, action) => {
            if(action.payload){

                state.user = action.payload
            }

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
export const { setUsers, setConfig,setData,setRoles } = userSlice.actions