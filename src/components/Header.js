import {
    ShoppingCartIcon,
    MagnifyingGlassIcon,
    HandThumbUpIcon,
} from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../slices/auth/authSlice'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const Header = () => {
    const { name, isAdmin } = useAuth()

    const token = useSelector(selectCurrentToken)
    return (
        <div className="">
            <div className="header flex justify-between gap-x-5 items-center bg-theme_blue ">
                <Link
                    to="/"
                    className="header__logo text-white text-lg flex sm:flex-grow-0 flex-grow items-center py-2 mx-5 pl-2 cursor-pointer"
                >
                    Shop <span className="text-indigo-600">Cart</span>
                    {isAdmin && <sub className="text-xs pl-1">Admin</sub>}
                </Link>
                <div className="header__search hidden sm:flex flex-grow items-center bg-indigo-400 hover:bg-indigo-500 rounded-md">
                    <input
                        type="text"
                        className="rounded-l-md focus:outline-none w-full px-2 text-sm py-2"
                    />
                    <MagnifyingGlassIcon className="h-3 w-8 text-black " />
                </div>
                <div className="header__nav flex gap-x-3 md:gap-x-5 items-center text-white text-xs md:text-sm py-1 mr-4 ml-5">
                    <div
                        className="header__nav-login link"
                        // onClick={!session ? signIn : signOut}
                    >
                        {token ? (
                            <p className="">Hello {name}</p>
                        ) : (
                            <Link to="/login">Sign In</Link>
                        )}
                    </div>

                    <div className="header__nav-basket relative flex gap-x-2 items-center link">
                        <span className="absolute bg-indigo-400 rounded-full top-0 left-5 p-1 w-4 h-4 flex justify-center items-center text-xs text-black ">
                            0
                        </span>
                        <ShoppingCartIcon className="h-8" />

                        <p className="hidden sm:flex">Basket</p>
                    </div>
                </div>
            </div>
            <div className="header__secondary flex gap-x-2 pl-4 h-7 items-center bg-theme_blue-light text-white text-xs font-medium">
                <p className="flex items-center link">
                    <HandThumbUpIcon className="h-5 w-5 px-1" />
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">ShopCart Business</p>
                <p className="link">Today's Deals</p>
                <p className="link hidden lg:flex">Electronics</p>
                <p className="link hidden lg:flex">Food & Grocery</p>
                <p className="link hidden lg:flex">Buy Again</p>
                <p className="link hidden lg:flex">Shopper Toolkit</p>
                <p className="link hidden lg:flex">Health & Personal Care</p>
            </div>
        </div>
    )
}

export default Header
