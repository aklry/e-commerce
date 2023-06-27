import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux'
import { citySelectReducers } from './reducers/citySelect'
import { viewProductList } from './reducers/viewProductList'

const reducers = combineReducers({
    citySelect: citySelectReducers,
    searchValue: viewProductList
})

export const store = createStore(reducers, composeWithDevTools())