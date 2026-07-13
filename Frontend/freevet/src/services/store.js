import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Slice"
import profileReducer from "./profileSlice"

const Store = configureStore({
  reducer: {
    auth: authReducer,      
    profile: profileReducer
  },
})

export default Store


