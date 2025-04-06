import { createSlice } from "@reduxjs/toolkit";

const subCategorySlice = createSlice({
    name: "subcategory",
    initialState: {
        subCategories: [],
    },
    reducers: {
        setSubCategory: (state, { payload }) => {
            state.subCategories = {...state.subCategories, ...payload}
        },
    }
})

export const { setSubCategory } = subCategorySlice.actions
export default subCategorySlice.reducer