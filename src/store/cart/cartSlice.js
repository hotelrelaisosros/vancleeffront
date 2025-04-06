import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart_items: [],
    },
    reducers: {
        setCartItems: (state, { payload }) => {
            state.cart_items = payload;
        },
    }
})

export const { setCartItems } = cartSlice.actions
export default cartSlice.reducer