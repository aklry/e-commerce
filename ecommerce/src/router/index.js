import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import { SpinLoading } from 'antd-mobile'
import ErrorPage from '../pages/Error'
const Types = React.lazy(() => import('../pages/Types'))
const SearchPage = React.lazy(() => import('../pages/Search'))
const ListPage = React.lazy(() => import('../pages/List'))
const DetailPage = React.lazy(() => import('../pages/Detail'))
const ConfirmOrderPage = React.lazy(() => import('../pages/ConfirmOrder'))
const AddressSelect = React.lazy(() => import('../pages/AddressSelect'))
const AddressForm = React.lazy(() => import('../pages/AddressForm'))
const OrderPage = React.lazy(() => import('../pages/Orders'))
const EvaluationPage = React.lazy(() => import('../pages/Evaluation'))
const EvaluationListPage = React.lazy(() => import('../pages/EvaluationList'))
const MyPage = React.lazy(() => import('../pages/My'))
const AddressListPage = React.lazy(() => import('../pages/AddressList'))
const StarPage = React.lazy(() => import('../pages/Star'))

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
                <Route path='/confirmOrder' element={<ConfirmOrderPage />} />
                <Route path='/addressSelect' element={<AddressSelect />} />
                <Route path='/addAddress' element={<AddressForm />} />
                <Route path='/orders' element={<OrderPage />} />
                <Route path='/evaluate' element={<EvaluationPage />} />
                <Route path='/evaluateList' element={<EvaluationListPage />} />
                <Route path='/my' element={<MyPage />} />
                <Route path='/addressList' element={<AddressListPage />} />
                <Route path='/star' element={<StarPage />} />
            </Routes>
        </BrowserRouter>
    </Suspense>
)