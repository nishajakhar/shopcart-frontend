import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewProductMutation } from '../slices/product/productApiSlice'

import TextInput from './Inputs/TextInput'
import Button from './Inputs/Button'
import ROUTES from '../helpers/routes'

const NewProductForm = () => {
    const categories = [
        "Men's Clothing",
        "Women's Clothing",
        'Electronics',
        'Health And Nutrition',
    ]
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState()

    const [
        addNewProduct,
        { isLoading, isSuccess, isError, error },
    ] = useAddNewProductMutation()

    const handleFileInputChange = event => {
        setFile(event.target.files[0])
    }
    const [serverError, setServerError] = useState('')

    const navigate = useNavigate()

    const onSubmit = async e => {
        e.preventDefault()

        if (!name || !description || !category || !price) {
            setServerError('Please fill out the input fields')

            return
        }
        try {
            const formData = new FormData()
            formData.append('images', file)
            formData.append('name', name)
            formData.append('category', category)
            formData.append('description', description)
            formData.append('price', price * 100)

            const response = await addNewProduct(formData)
            setName('')
            setCategory('')
            setDescription('')
            setFile(null)
            setPrice(0)
            setServerError('')
            navigate(ROUTES.PRODUCT_LIST)
        } catch (err) {
            setName('')
            setCategory('')
            setDescription('')
            setFile(null)
            setPrice(0)
            setServerError('')
            if (!err.status) {
                setServerError('No Server Response')
            }
            setServerError(err.data?.message)
        }
    }
    return (
        <div className="">
            <div className="h-full flex items-center justify-center bg-white py-5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg w-full space-y-8 bg-gray-100 p-12 rounded shadow-lg">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create New Product
                    </h2>

                    {serverError && (
                        <div className="bg-red-100 px-4 py-4 font-small text-red-700 rounded shadow-sm">
                            {serverError}
                            {'.'}
                        </div>
                    )}
                    <form
                        className="mt-8 space-y-6"
                        action="#"
                        onSubmit={onSubmit}
                    >
                        <div className="rounded-md shadow-sm ">
                            <TextInput
                                type="text"
                                name={'name'}
                                value={name}
                                setName={setName}
                                placeholder={'Please enter product name'}
                                classAttr={
                                    ' appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                }
                            />
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder={'Please enter product description'}
                                rows="5"
                                className={
                                    ' appearance-none rounded-none relative block w-full my-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 text-sm focus:border-indigo-500 focus:z-10 sm:text-sm'
                                }
                            />
                            <select
                                name={'category'}
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className={
                                    ' my-2  block w-full px-3 py-2 border border-gray-300  text-green-900 rounded-lg bg-white sm:text-sm'
                                }
                            >
                                {categories.map((category, index) => (
                                    <option key={index}>{category}</option>
                                ))}
                            </select>

                            <TextInput
                                type="number"
                                name={'price'}
                                value={price}
                                setName={setPrice}
                                placeholder={'Please enter product price'}
                                classAttr={
                                    ' appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                }
                            />
                            <input
                                accept="image/*"
                                className={'fileInput my-2'}
                                id="productImage"
                                type="file"
                                onChange={handleFileInputChange}
                            />
                        </div>

                        <Button
                            type="submit"
                            text="Create"
                            isLoading={isLoading}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProductForm
