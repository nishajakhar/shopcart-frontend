import React from 'react'
import NewProductForm from '../components/NewProductForm'
import Sidebar from '../components/Sidebar'

const NewProductScreen = () => {
    return (
        <div className="flex">
            <Sidebar />{' '}
            <div className="flex-1">
                <NewProductForm />
            </div>
        </div>
    )
}

export default NewProductScreen
