import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar'
import Currency from 'react-currency-formatter'

import { selectProductById } from '../slices/product/productApiSlice'

const ProductDetailScreen = () => {
    const { id } = useParams()
    const product = useSelector(state => selectProductById(state, id))

    return (
        <div className="flex">
            <Sidebar />
            <div className=" h-fit m-12 p-10 rounded-lg border-2 border-indigo-100 shadow-lg shadow-indigo-300">
                <div className="flex gap-x-4 ">
                    <div className="">
                        <img
                            width="200"
                            src={`${process.env.REACT_APP_API_URL}${product.images[0]}`}
                        />
                    </div>
                    <div className="text-lg">
                        <div className="py-3">
                            <span className=" pr-3">Product Name:</span>
                            <span className="text-indigo-600">
                                {product.name}
                            </span>
                        </div>
                        <div className="py-3">
                            <span className=" pr-3">Product Description:</span>
                            <span className="text-indigo-600">
                                {product.description}
                            </span>
                        </div>
                        <div className="py-3">
                            <span className=" pr-3">Product Category:</span>
                            <span className="text-indigo-600">
                                {product.category}
                            </span>
                        </div>
                        <div className="py-3">
                            <span className=" pr-3">Product Price:</span>
                            <Currency
                                quantity={product.price / 100}
                                currency="INR"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button className="button my-8 w-96 ">Add to Basket</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailScreen
