import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        deletedProducts: [],
        uploadedProducts: [],
        selectedProduct: null
    },
    reducers: {
        setProducts: (state, { payload }) => {
            state.products = payload
        },
        setSingleProduct: (state, { payload }) => {
            state.selectedProduct = payload
        },
        setDeletedProducts: (state, { payload }) => {
            state.deletedProducts = payload
        },
        setUploadedProducts: (state, { payload }) => {
            state.uploadedProducts = payload
        },
    }
})

export const { setProducts, setUploadedProducts, setDeletedProducts, setSingleProduct } = productsSlice.actions
export default productsSlice.reducer