import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSignupMutation } from '../slices/user/userApiSlice'
import TextInput from './Inputs/TextInput'
import Button from './Inputs/Button'
import { Link } from 'react-router-dom'
import { setCredentials } from '../slices/auth/authSlice'
import ROUTES from '../helpers/routes'

const SignupForm = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [serverError, setServerError] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [nameError, setNameError] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading }] = useSignupMutation()

    const onSubmit = async e => {
        e.preventDefault()

        if (!email || !password || !name) {
            setServerError('Please fill out the input fields')
            if (!email) {
                setEmailError(true)
            }
            if (!password) {
                setPasswordError(true)
            }
            if (!name) {
                setNameError(true)
            }
            return
        }
        try {
            const { token, data } = await register({
                email,
                password,
                name,
            }).unwrap()
            dispatch(setCredentials({ token }))
            setEmail('')
            setPassword('')
            setName('')
            setEmailError(false)
            setPasswordError(false)
            setNameError(false)
            setServerError('')
            localStorage.setItem('token', token)

            navigate(ROUTES.DASHBOARD)
        } catch (err) {
            setEmailError(false)
            setPasswordError(false)
            setNameError(false)

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
                        <GlobeAsiaAustraliaIcon className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>

                    {serverError && (
                        <div className="bg-red-100 text-xs px-4 py-4 text-red-700 rounded shadow-sm">
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
                        <div className="rounded-md shadow-sm ">
                            <TextInput
                                type="text"
                                name={'name'}
                                value={name}
                                setName={setName}
                                nameError={nameError}
                                placeholder={'Please enter your name'}
                                classAttr={
                                    ' appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                }
                            />
                            <TextInput
                                type="email"
                                name={'email'}
                                value={email}
                                setName={setEmail}
                                nameError={emailError}
                                placeholder={'Please enter your email address'}
                                classAttr={
                                    ' appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                }
                            />
                            <TextInput
                                type="password"
                                name={'password'}
                                value={password}
                                setName={setPassword}
                                nameError={passwordError}
                                placeholder={'Please enter your password'}
                                classAttr={
                                    ' sappearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="terms"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    I Agree to{' '}
                                    <span className="text-indigo-600">
                                        Terms
                                    </span>{' '}
                                    &{' '}
                                    <span className="text-indigo-600">
                                        {' '}
                                        Conditions
                                    </span>
                                </label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            text="Sign Up"
                            isLoading={isLoading}
                        />
                    </form>
                    <p className="text-xs text-center">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-indigo-600 hover:underline "
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignupForm
