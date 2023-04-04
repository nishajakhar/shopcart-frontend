import {
    ArrowRightOnRectangleIcon,
    PlusIcon,
    BuildingStorefrontIcon,
    ComputerDesktopIcon,
} from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { logOut } from '../slices/auth/authSlice'
import useAuth from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import ROUTES from '../helpers/routes'
const Header = () => {
    const { isAdmin } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = () => {
        dispatch(logOut())
        navigate(ROUTES.LOGIN)
    }

    return (
        <div className="bg-indigo-400 h-screen pt-12">
            <Link to={ROUTES.DASHBOARD}>
                <div className="flex gap-x-2 hover:text-white hover:bg-indigo-500 py-2 px-8 my-2">
                    <ComputerDesktopIcon className="w-5 h-5" />
                    <span className="text-sm font-bolder ">Dashboard</span>
                </div>
            </Link>
            <Link to={ROUTES.PRODUCT_LIST}>
                <div className="flex gap-x-2 hover:text-white hover:bg-indigo-500 py-2 px-8 my-2">
                    <BuildingStorefrontIcon className="w-5 h-5" />
                    <span className="text-sm font-bolder ">Products</span>
                </div>
            </Link>
            {isAdmin && (
                <Link to={ROUTES.CREATE_PRODUCT}>
                    <div className="flex gap-x-2 hover:text-white hover:bg-indigo-500 py-2 px-8 my-2">
                        <PlusIcon className="w-5 h-5" />
                        <span className="text-sm font-bolder ">
                            Add new product
                        </span>
                    </div>
                </Link>
            )}
            <p onClick={onLogout}>
                <div className="flex gap-x-2 hover:text-white hover:bg-indigo-500 py-2 px-8 my-2">
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span className="text-sm font-bolder ">Logout</span>
                </div>
            </p>
        </div>
    )
}

export default Header
