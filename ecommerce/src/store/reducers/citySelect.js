const initialState = {
    city: {}
}

export function citySelectReducers(state = initialState, action) {
    switch (action.type) {
        case 'SET_CITY':
            return { ...state, city: action.payload }
        default:
            return state
    }
}