import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux'
import { citySelectReducers } from './reducers/citySelect'
import { viewProductList } from './reducers/viewProductList'
import { selectAddress } from './reducers/selectAddress'

const reducers = combineReducers({
    citySelect: citySelectReducers,
    searchValue: viewProductList,
    address: selectAddress
})

export const store = createStore(reducers, composeWithDevTools())