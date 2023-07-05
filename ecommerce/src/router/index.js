import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import { SpinLoading } from 'antd-mobile'
import ErrorPage from '../pages/Error'
const Types = React.lazy(() => import('../pages/Types'))
const SearchPage = React.lazy(() => import('../pages/Search'))
const ListPage = React.lazy(() => import('../pages/List'))
const DetailPage = React.lazy(() => import('../pages/Detail'))
const OrderPage = React.lazy(() => import('../pages/ConfirmOrder'))
const AddressSelect = React.lazy(() => import('../pages/AddressSelect'))
const AddressForm = React.lazy(() => import('../pages/AddressForm'))


export default (
    <Suspense fallback={ <SpinLoading/> }>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/types' element={<Types />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/list' element={<ListPage />} />
                <Route path='/details' element={<DetailPage />} />
                <Route path='/error' element={<ErrorPage />} />
                <Route path='/confirmOrder' element={<OrderPage />} />
                <Route path='/addressSelect' element={<AddressSelect />} />
                <Route path='/addAddress' element={<AddressForm />} />
            </Routes>
        </BrowserRouter>
    </Suspense>
)