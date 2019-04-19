import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";


import incidentReducer from "./store/reducers/incident";
import { watchIncident } from "./store/sagas";

const rootReducer = combineReducers({
    incident: incidentReducer
});

const sagaMiddleware = createSagaMiddleware();

// create store
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

// run sagas 
sagaMiddleware.run(watchIncident);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
