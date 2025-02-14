import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart: [],
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            // payload = newitem
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            // payload = id of the item
            state.cart = state.cart.filter(
                (item) => item.pizzaId !== action.payload
            )
        },
        increaseItemQuantity(state, action) {
            //  we are also passing id of the item
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            )
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            )

            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice
            // we are using the case reducer to call the deleteItem reducer function
            if (item.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart(state) {
            state.cart = []
        },
    },
})

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart.cart

export const getTotalPrice = (state) =>
    state.cart.cart.reduce((acc, item) => {
        return acc + item.totalPrice
    }, 0)

export const getTotalQuantity = (state) =>
    state.cart.cart.reduce((acc, item) => acc + item.quantity, 0)

export const getCurrentQuantity = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
