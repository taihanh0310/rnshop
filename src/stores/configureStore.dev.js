import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducers from '../RootReducers';
import logger from 'redux-logger';

export default function configureStore() {
    const store = createStore(RootReducers,applyMiddleware(thunk, logger));

    return store;
}

