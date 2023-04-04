import React from 'react'

const Button = ({ isLoading, text, type }) => {
    return (
        <div>
            <button
                type={type}
                disabled={isLoading}
                className={
                    (isLoading ? 'text-opacity-25' : '') +
                    ' group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }
            >
                {isLoading ? 'Please wait....' : text}
            </button>
        </div>
    )
}

export default Button