import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducers from '../reducers/RootReducers';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

// const pReducer = persistReducer(persistConfig, RootReducers);

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, RootReducers);// Redux: Store

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, createLogger()), // Middleware: Redux Persist Persister
);

let persistor = persistStore(store);// Exports

export {
    store,
    persistor,
};

