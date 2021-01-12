import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';

import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { adminReducer, adminSaga, USER_LOGOUT } from 'react-admin';

import * as Providers from './Providers';
// My modules
import * as Modules from './modules';

export const history = createBrowserHistory();

const enhancers = [];

const reducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),

    ...Modules,
});

const resettableAppReducer = (state, action) => reducer(action.type !== USER_LOGOUT ? state : undefined, action);

const saga = function* rootSaga() {
    yield all(
        [
            // @ts-ignore
            adminSaga(...Object.values(Providers)),
        ].map(fork)
    );
};
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
        typeof window !== 'undefined' &&
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25,
        })) ||
    compose;

const middleware = [sagaMiddleware, routerMiddleware(history)];
const initialState = {};

const store = createStore(
    resettableAppReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);
sagaMiddleware.run(saga);

export default store;
