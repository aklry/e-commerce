import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import { SpinLoading } from 'antd-mobile'
const Types = React.lazy(() => import('../pages/Types'))
const SearchPage = React.lazy(() => import('../pages/Search'))


export default (
    <Suspense fallback={ <SpinLoading/> }>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/types' element={<Types />} />
                <Route path='/search' element={<SearchPage />} />
            </Routes>
        </BrowserRouter>
    </Suspense>
)