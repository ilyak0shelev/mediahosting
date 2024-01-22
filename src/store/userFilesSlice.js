import { createSlice } from "@reduxjs/toolkit"

const userFilesSlice = createSlice({
    name: "userfiles",
    initialState: {
        files: [],
    },
    reducers: {
        addFiles(state, action) {
            if (!state.files.find(el => el.id === action.payload.id))
                state.files.push(action.payload)
        },
        clearStorage(state) {
            state.files.splice(0, state.files.length)
        }
    }
})

export default userFilesSlice.reducer
export const {addFiles, clearStorage} = userFilesSlice.actions