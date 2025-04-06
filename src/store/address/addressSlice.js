import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: "address",
    initialState: {
        list: [],
    },
    reducers: {
        setAddressList: (state, { payload }) => {
            state.list = payload;
        },
        addAddress: (state, { payload }) => {
            state.list.push(payload);
        },
    }
})

export const { setAddressList, addAddress } = addressSlice.actions
export default addressSlice.reducer