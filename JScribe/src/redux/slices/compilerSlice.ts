import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
    html: string,
    css: string,
    javascript: string,
    currentLanguage: "html" | "css" | "javascript";
}

const initialState: InitialStateType = {
    html: "",
    css: "",
    javascript: "",
    currentLanguage: "html"
};

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<InitialStateType["currentLanguage"]>) => {
            state.currentLanguage = action.payload;
        },
    }
})

export default compilerSlice.reducer;
export const { updateCurrentLanguage } = compilerSlice.actions