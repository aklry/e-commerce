const initialState = {
    title: '', //商品列表搜索的关键字
}

export function viewProductList(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case 'SET_SEARCH_VALUE':
            return { ...state, title: payload}
        default:
            return state;
    }
} 