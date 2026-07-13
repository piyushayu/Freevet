import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name : "auth",
   initialState,
   reducers : {

       signup : (state , action) => {
       state.status = true;
       state.userData = action.payload.userData
       },

       login : (state , action) => {
        state.status = true ;
        state.userData = action.payload.userData
       } ,
       logout : (state , action) => {
       state.status = false;
       state.userData = null
       }
   }

})

export const {logout , login , signup} = authSlice.actions

export default authSlice.reducer
