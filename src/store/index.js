import {legacy_createStore, combineReducers} from "redux"
import { mainReducer } from "./mainReducer"

const rootReducer = combineReducers({
    files: mainReducer,
})

export const store = legacy_createStore(rootReducer)