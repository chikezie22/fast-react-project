import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAddress } from '../../services/apiGeocoding'

function getPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

// fetchUserData is now an action
export const fetchUserData = createAsyncThunk('user/fetchData', async () => {
    const positionObj = await getPosition()
    const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
    }
    const addressObj = await getAddress(position)
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`
    // this is actually the payload for the fulfilled state
    return { position, address }
})

const initialState = {
    userName: '',
    status: 'idle',
    position: {},
    address: '',
    error: '',
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateName(state, action) {
            state.userName = action.payload
            // localStorage.setItem('userName', JSON.stringify(action.payload))
        },
    },
    // this is the technique used for async operations in redux
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'idle'
                state.position = action.payload.position
                state.address = action.payload.address
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.error.message
            })
    },
})

export const { updateName } = userSlice.actions
export default userSlice.reducer

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

// export const fetchUserData = createAsyncThunk('user/fetchData', async()=>{
//     const response = await fetch('/api/cart');
//     const data = response.json()
//     return data
// })

// const initialState = {isLoggedIn:false, cart:[], status:idle, error:''}
// const cartSlice = createSlice({
//     name:'cart',
//     initialState,
//     reducers:{
//         addItem(state,action){
//             state.cart.push(action.payload)
//         },

//         deleteItem(state,action){
//             state.cart.filter((item)=> item.id !== action.payload)
//         }

//         applyDiscount(state,action){
//          const item =   state.cart.find((item)=> item.id === action.payload)

//          if(item.discount){
//             item.totalPrice = (item.unitPrice * item.quantity) - (item.unitPrice * item.quantity * .2)
//          }
//         }
//     },

//     extraReducers: (builder)=>{
//         builder.addCase(fetchUserData.pending,(state)=>{
//             state.status = 'loading'
//         }).addCase(fetchUserData.fulfilled, (state,action)=>{
//             state.status = 'idle'
//             state.cart.push(action.payload.data)
//         }).addCase(fetchUserData.rejected, (state,action)=>{
//             state.status = 'error'
//             state.error = action.error.message
//         })
//     }

// })

// export {addItem, deleteItem, applyDiscount} = cartSlice.actions
// export default cartSlice.reducer
