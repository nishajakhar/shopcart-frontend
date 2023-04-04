import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import ROUTES from '../../helpers/routes'

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { role } = useAuth()

    const content = allowedRoles.includes(role) ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth
