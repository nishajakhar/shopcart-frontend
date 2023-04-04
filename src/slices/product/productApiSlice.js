import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const productAdapter = createEntityAdapter()

const initialState = productAdapter.getInitialState()

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => ({
                url: '/api/product',

                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedProducts = responseData.data.map(product => {
                    product.id = product._id
                    return product
                })
                return productAdapter.setAll(initialState, loadedProducts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Product', id })),
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            },
        }),
        addNewProduct: builder.mutation({
            query: initialProduct => ({
                url: '/api/product',
                prepareHeaders: headers => {
                    headers.set('Content-Type', 'multipart/form-data')
                    return headers
                },
                method: 'POST',
                body: initialProduct,
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }],
        }),
    }),
})

export const { useGetProductsQuery, useAddNewProductMutation } = productApiSlice

// returns the query result object
export const selectProductsResult = productApiSlice.endpoints.getProducts.select()

// creates memoized selector
const selectProductsData = createSelector(
    selectProductsResult,
    productResult => productResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds,
    // Pass in a selector that returns the product slice of state
} = productAdapter.getSelectors(
    state => selectProductsData(state) ?? initialState
)
