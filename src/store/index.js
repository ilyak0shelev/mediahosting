import { configureStore } from "@reduxjs/toolkit"
import userFilesSlice from "./userFilesSlice"
import userLikesSlice from "./userLikesSlice"
import userSubsSlice from "./userSubsSlice"

const store = configureStore({
    reducer: {
        userfiles: userFilesSlice,
        userlikes: userLikesSlice,
        usersubs: userSubsSlice,
    }
})

export default store