import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation({
            query: body => ({
                url: '/api/user/register',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useSignupMutation } = userApiSlice
