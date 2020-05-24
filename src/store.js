import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import inputValueReducer from "./reducers/inputValue";
import armoryItemsReducer from "./reducers/armoryItems";
import playerCardReducer from "./reducers/playerCards";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  inputValue: inputValueReducer,
  armoryItems: armoryItemsReducer,
  playerCards: playerCardReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
