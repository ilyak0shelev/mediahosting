import { createSlice } from "@reduxjs/toolkit"

const userFilesSlice = createSlice({
    name: "userfiles",
    initialState: {
        files: [],
        hiddenFiles: [],
        filesFetched: false,
    },
    reducers: {
        addFiles(state, action) {
            if (!state.files.find(el => el.id === action.payload.id))
                state.files.push(action.payload)
        },
        unshiftFiles(state, action) {
            if (!state.files.find(el => el.id === action.payload.id))
                state.files.unshift(action.payload)
        },
        addHiddenFiles(state, action) {
            if (!state.hiddenFiles.find(el => el.id === action.payload.id))
                state.hiddenFiles.unshift(action.payload)
        },
        clearStorage(state) {
            state.files.splice(0, state.files.length)
            state.hiddenFiles.splice(0, state.hiddenFiles.length)
        },
        filterFiles(state, action) {
            state.files = state.files.filter(el => el.id !== action.payload)
        },
        filterHiddenFiles(state, action) {
            state.hiddenFiles = state.hiddenFiles.filter(el => el.id !== action.payload)
        },
        toggleFileVisibility(state, action) {
            if (action.payload.hidden) {
                state.files.forEach((el) => {
                    if (el.hidden) {
                        el.hidden = false
                    }
                })
            }
            else {
                state.hiddenFiles.forEach((el) => {
                    if (!el.hidden) {
                        el.hidden = true
                    }
                })
            }
        },
        editFile(state, action) {
            if (action.payload.hidden) {
                state.hiddenFiles.forEach((el) => {
                    if (el.id === action.payload.id) {
                        el.title = action.payload.title
                        el.description = action.payload.description
                        el.tags = action.payload.tags
                    }
                })
            }
            else {
                state.files.forEach((el) => {
                    if (el.id === action.payload.id) {
                        el.title = action.payload.title
                        el.description = action.payload.description
                        el.tags = action.payload.tags
                    }
                })
            }
        },
        setFetched(state, action) {
            state.filesFetched = action
        },

    }
})

export default userFilesSlice.reducer
export const { addFiles, unshiftFiles, addHiddenFiles, clearStorage, filterFiles, filterHiddenFiles, toggleFileVisibility, editFile, setFetched } = userFilesSlice.actions