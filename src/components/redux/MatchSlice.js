import { createSlice } from "@reduxjs/toolkit";



const matchSlice = createSlice({
    name  : 'match',
    initialState : [],
    reducers : {
        addMatch : (state,action)=>{
          return  action.payload
        },
        removeMatch : (state, action)=>{
return null
        }
    }
})

export default matchSlice.reducer
export const {addMatch,removeMatch} = matchSlice.actions







