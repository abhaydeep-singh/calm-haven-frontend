import { createSlice } from "@reduxjs/toolkit";

const initialState={
    surveyData:null
}

const srqSlice = createSlice({
    name:"srq",
    initialState,
    reducers:{
        addData: (state,action)=>{
            state.surveyData = action.payload.surveyData;
        }
    }
})

export const{addData} = srqSlice.actions;

export default srqSlice.reducer;