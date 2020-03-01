import { combineReducers, createStore } from "redux";
import statusPointsReducer from "./reducers/statusPoints";
import inputValueReducer from "./reducers/inputValue";

const rootReducer = combineReducers({
  statusLabel: statusPointsReducer,
  inputValue: inputValueReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
