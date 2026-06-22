import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name :'request',
    initialState : [],
    reducers : {
        addRequest  :(state, action) =>{
            return action.payload
        },
        removeRequest : (state,action)=>{
    const remainingRequest = state.filter((user)=> user_.id !== action.payload )
    return remainingRequest
            
        }

    }

})



export const {addRequest,removeRequest} = requestSlice.actions
export default requestSlice.reducer



