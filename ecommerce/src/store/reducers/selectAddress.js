const initialState = {
    address: {}
}

export function selectAddress(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case 'SET_ADDRESS':
            return { ...state, address: payload }
        case 'DELETE_ADDRESS':
            return { ...state, address: payload }
        default: 
            return state;
    }
} 