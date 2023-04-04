import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/auth/authApiSlice'

import TextInput from './Inputs/TextInput'
import Button from './Inputs/Button'
import { Link } from 'react-router-dom'
import ROUTES from '../helpers/routes'
const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [serverError, setServerError] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const onSubmit = async e => {
        e.preventDefault()

        if (!email || !password) {
            setServerError('Please fill out the input fields')
            if (!email) {
                setEmailError(true)
            }
            if (!password) {
                setPasswordError(true)
            }
            return
        }
        try {
            const { token } = await login({ email, password }).unwrap()
            setEmail('')
            setPassword('')
            setEmailError(false)
            setPasswordError(false)
            setServerError('')
            localStorage.setItem('token', token)

            navigate(ROUTES.DASHBOARD)
        } catch (err) {
            setEmailError(false)
            setPasswordError(false)
            if (!err.status) {
                setServerError('No Server Response')
            }
            setServerError(err.data?.message)
        }
    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-gray-100 p-8 rounded shadow-lg">
                    <div className="text-center flex justify-center">
                        <ArrowLeftOnRectangleIcon className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    {serverError && (
                        <div className="bg-red-100 px-4 text-xs py-4 text-red-700 rounded shadow-sm">
                            {serverError}
                            {'.'}
                        </div>
                    )}
                    <form
                        className="mt-8 space-y-6"
                        action="#"
                        onSubmit={onSubmit}
                    >
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <TextInput
                                type="email"
                                name={'email'}
                                value={email}
                                setName={setEmail}
                                nameError={emailError}
                                placeholder={'Please enter your email address.'}
                                classAttr={
                                    ' appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                }
                            />
                            <TextInput
                                type="password"
                                name={'password'}
                                value={password}
                                setName={setPassword}
                                nameError={passwordError}
                                placeholder={'Please enter your password.'}
                                classAttr={
                                    ' sappearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember_me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="/"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            text="Sign In"
                            isLoading={isLoading}
                        />
                    </form>
                    <p className="text-xs text-center">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-indigo-600 hover:underline "
                        >
                            Signup here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
