import { Outlet } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ROUTES from './helpers/routes'
import SignupScreen from './pages/SignupScreen'
import LoginScreen from './pages/LoginScreen'
import HomeScreen from './pages/HomeScreen'
import WelcomeScreen from './pages/WelcomeScreen'
import ProductsListScreen from './pages/ProductsListScreen'
import ProductDetailScreen from './pages/ProductDetailScreen'
import NewProductScreen from './pages/NewProductScreen'
import Header from './components/Header'

import Prefetch from './components/Prefetch'
import RequireAuth from './components/auth/RequireAuth'
import { ROLES } from './helpers/roles'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/">
                    {/* public routes */}
                    <Route index element={<HomeScreen />} />
                    <Route path="signup" element={<SignupScreen />} />
                    <Route path="login" element={<LoginScreen />} />

                    {/* Protected Routes */}
                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={[...Object.values(ROLES)]}
                            />
                        }
                    >
                        <Route element={<Prefetch />}>
                            <Route path="dashboard">
                                <Route index element={<WelcomeScreen />} />

                                <Route path="products">
                                    <Route
                                        index
                                        element={<ProductsListScreen />}
                                    />
                                    <Route
                                        path=":id"
                                        element={<ProductDetailScreen />}
                                    />

                                    <Route
                                        element={
                                            <RequireAuth
                                                allowedRoles={[ROLES.Admin]}
                                            />
                                        }
                                    >
                                        <Route
                                            path="new"
                                            element={<NewProductScreen />}
                                        />
                                    </Route>
                                </Route>
                            </Route>
                            {/* End Dash */}
                        </Route>
                    </Route>
                    {/* End Protected Routes */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
