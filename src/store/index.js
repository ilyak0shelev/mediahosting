import userFilesSlice from "./userFilesSlice" 
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        userfiles: userFilesSlice,
    }
})

export default store