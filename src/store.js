import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];
const enhancer = composeEnhancers(applyMiddleware(...middlewares));
export let store = createStore(persistedReducer, enhancer);

let persistor = persistStore(store);

export default { store, persistor };
