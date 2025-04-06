import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        packages: [],
        expirePackages: [],
        orderDetails: {},
        order_history: []
    },
    reducers: {
        setPackage: (state, { payload }) => {
            state.packages = payload
        },
        setOrderHistory: (state, { payload }) => {
            state.order_history = payload
        },
        setCurrentOrderHistory: (state, { payload }) => {
            state.orderDetails = payload
        },
        setExpirePackage: (state, { payload }) => {
            state.expirePackages = payload
        },
    }
})

export const { setPackage, setExpirePackage, setOrderHistory, setCurrentOrderHistory } = orderSlice.actions
export default orderSlice.reducer