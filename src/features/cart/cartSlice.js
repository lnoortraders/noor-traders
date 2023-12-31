import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: []

}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // checking if produt exist or not 
      let temp = state.products.filter(prod => prod.id === action.payload.id);
      // if Product exist then we will not push it again in the cart 
      if (temp.length === 0) {
        state.products.push(action.payload);
        localStorage.setItem('NoorTradersCart',JSON.stringify(state.products))
      }
    },
    modifyQuantity: (state, action) => {
      let index = state.products.findIndex(prod => {
        return prod.id === action.payload.id
      });
      state.products[index].quantity += action.payload.pay;
      if (state.products[index].quantity === 0) {
        state.products = state.products.filter(prod => prod.id !== action.payload.id);
      }
      localStorage.setItem('NoorTradersCart',JSON.stringify(state.products))

    },
    removeItem: (state, action) => {
      state.products = state.products.filter(prod => prod.id !== action.payload);
      localStorage.setItem('NoorTradersCart',JSON.stringify(state.products))
    },
    initializeCart: (state, action) => {
      console.log('inside cart slice ')
      console.log(action.payload);
      state.products.push(...action.payload);
    }
  }
})

export default cartSlice.reducer
export const {
  addProduct,
  modifyQuantity,
  removeItem,
  initializeCart } = cartSlice.actions 