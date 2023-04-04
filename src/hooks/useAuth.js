import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../slices/auth/authSlice'

import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    let isAdmin = false
    let status = 'User'

    if (token) {
        const { role, name } = jwtDecode(token)

        isAdmin = role === 'Admin'
        if (isAdmin) status = 'Admin'

        return { role, name, status, isAdmin }
    }

    return { name: '', role: '', isAdmin, status }
}
export default useAuth
