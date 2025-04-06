import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist_items: [],
    },
    reducers: {
        setWishlistItems: (state, { payload }) => {
            state.wishlist_items = payload;
        },
    }
})

export const { setWishlistItems } = wishlistSlice.actions
export default wishlistSlice.reducer