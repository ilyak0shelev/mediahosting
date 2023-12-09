const defaultState = {
    files: []
}

const ADD_FILE = "ADD_FILE"

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_FILE:
            return {
            }
        default:
            return state
    }
}

export const addFileAction = (payload) => ({type: ADD_FILE, payload})