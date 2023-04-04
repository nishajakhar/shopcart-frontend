import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../slices/auth/authSlice'
import ROUTES from '../helpers/routes'

const LoginScreen = () => {
    const token = useSelector(selectCurrentToken)

    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            navigate(ROUTES.DASHBOARD)
        }
    }, [])
    return (
        <div className="bg-gray-100 h-full">
            <main className="max-w-screen-lg mx-auto">
                <LoginForm />
            </main>
        </div>
    )
}

export default LoginScreen
