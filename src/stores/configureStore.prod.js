import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducers from '../RootReducers';

export default function configureStore() {
    const store = createStore(RootReducers,applyMiddleware(thunk));

    return store;
}

