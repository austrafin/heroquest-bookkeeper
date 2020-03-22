import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import statusPointsReducer from "./reducers/statusPoints";
import inputValueReducer from "./reducers/inputValue";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/statusPoints";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  statusPoints: statusPointsReducer,
  inputValue: inputValueReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
