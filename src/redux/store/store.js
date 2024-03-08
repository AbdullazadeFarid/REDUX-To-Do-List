import { combineReducers, createStore } from "redux";
import listReducer from "../reducers/reducer";

const reducer = combineReducers({
  listReducer,
});

export const store = createStore(reducer);
