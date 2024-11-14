import { createSlice } from "@reduxjs/toolkit"

const userLikesSlice = createSlice({
    name: "userlikes",
    initialState: {
        likes: [],
        likesCount: 0,
    },
    reducers: {
        addLikes(state, action) {
            if (!state.likes.find(el => el.postID === action.payload.postID)) {
                state.likes.unshift(action.payload)
            }
        },
        clearLikes(state) {
            state.likes.splice(0, state.likes.length)
        },
        filterLikes(state, action) {
            state.likes = state.likes.filter(el => el.postID !== action.payload)
        },
        setLikesCount(state, action) {
            state.likesCount = action.payload
        },
        increaseLikesCount(state) {
            state.likesCount = state.likesCount + 1
        },
        decreaseLikesCount(state) {
            state.likesCount = state.likesCount - 1
        },
    }
})

export default userLikesSlice.reducer
export const {addLikes, clearLikes, filterLikes, setLikesCount, increaseLikesCount, decreaseLikesCount} = userLikesSlice.actions