import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { token } = action.payload
            state.token = token
            localStorage.setItem('token', action.payload)
        },
        logOut: (state, action) => {
            state.token = null
            state.user = null
            localStorage.clear()
        },
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = state => state.auth.token
