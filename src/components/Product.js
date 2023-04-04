import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { StarIcon } from '@heroicons/react/24/solid'
import Currency from 'react-currency-formatter'
import ROUTES from '../helpers/routes'

const MAX_RATING = 5
const MIN_RATING = 1
const Product = ({ id, name, images, category, price, description }) => {
    const navigate = useNavigate()

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
    )
    const handleProductClick = () => {
        navigate(`${ROUTES.PRODUCT_LIST}/${id}`)
    }

    return (
        <div
            className="flex flex-col cursor-pointer relative bg-white p-5 z-20 rounded-md border-2 border-slate-100"
            onClick={handleProductClick}
        >
            <p className="absolute text-xs italic top-2 right-2 text-gray-400">
                {category}
            </p>
            <div className="flex items-center justify-center py-2">
                <img
                    src={process.env.REACT_APP_API_URL + images[0]}
                    className="h-44 w-fit"
                />
            </div>
            <h4 className="my-2 text-md">{name}</h4>
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon className="h-5 text-indigo-800" key={i} />
                    ))}
            </div>
            <p className="my-2 text-sm line-clamp-2">{description}</p>
            <div className="text-sm font-bold py-2">
                <Currency quantity={price / 100} currency="INR" />
            </div>

            <div className="flex-grow flex items-end">
                <button className="button w-full">Add to Basket</button>
            </div>
        </div>
    )
}

export default Product
