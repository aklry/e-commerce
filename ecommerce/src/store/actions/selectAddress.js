export const setAddress = payload => {
    return {
        type: 'SET_ADDRESS',
        payload
   }
}

export const deleteAddress = payload => {
    return {
        type: 'DELETE_ADDRESS',
        payload
    }
}