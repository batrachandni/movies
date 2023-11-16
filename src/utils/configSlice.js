import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name : "lang",
    initialState : {
        selectedlang : "en"
    },
    reducers : {
        handleLang : (state , action) => {
            state.selectedlang = action.payload
        }
    }
})

export const {handleLang} = configSlice.actions
export default configSlice.reducer
