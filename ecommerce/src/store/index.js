import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux'
import { citySelectReducers } from './reducers/citySelectReducers'

const reducers = combineReducers({
    citySelect: citySelectReducers
})

export const store = createStore(reducers, composeWithDevTools())