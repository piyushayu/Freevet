import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Slice"

const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default Store


