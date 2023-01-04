import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer
export const {setUsers } = userSlice.actions