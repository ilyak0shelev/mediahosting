import { createSlice } from "@reduxjs/toolkit"

const userSubsSlice = createSlice({
    name: "usersubs",
    initialState: {
        subscriptions: [],
        subscribers: [],
    },
    reducers: {
        addSubscriptions(state, action) {
            if (!state.subscriptions.find(el => el.user === action.payload.user)) {
                state.subscriptions.unshift(action.payload)
            }
        },
        filterSubscriptions(state, action) {
            state.subscriptions = state.subscriptions.filter(el => el.user !== action.payload.user)
        },
        addSubscribers(state, action) {
            if (!state.subscribers.find(el => el.subscriber === action.payload.subscriber)) {
                state.subscribers.unshift(action.payload)
            }
        },
        clearSubs(state) {
            state.subscriptions.splice(0, state.subscriptions.length)
            state.subscribers.splice(0, state.subscribers.length)
        }
    }
})

export default userSubsSlice.reducer
export const { addSubscriptions, addSubscribers, filterSubscriptions, clearSubs } = userSubsSlice.actions