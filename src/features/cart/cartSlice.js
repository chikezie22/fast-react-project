import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart:[]
};
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem(state,action){
            // payload = newitem
            state.cart.push(action.payload)
        },
        deleteItem(state,action){
            // payload = id of the item
         state.cart = state.cart.filter(item=>item.id !== action.payload)
        },
        increaseItemQuantity(state,action){
            const item = state.cart.find(item=>item.id=== action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state,action){
            const item = state.cart.find(item=>item.id === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice
            
        },
        clearCart(state){
        state.cart = initialState;
        }
    }
})

export const {addItem,deleteItem, increaseItemQuantity,decreaseItemQuantity,clearCart} = cartSlice.actions;

export default cartSlice.reducer;