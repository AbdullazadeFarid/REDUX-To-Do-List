import { combineReducers, createStore } from "redux";
import listReducer from "../reducer/reducer";

const reducer = combineReducers({
  listReducer,
});

export const store = createStore(reducer);
