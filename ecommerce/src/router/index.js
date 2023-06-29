import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Types from '../pages/Types'


export default (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/types' element={ <Types /> } />
        </Routes>
    </BrowserRouter>
)