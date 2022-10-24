import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppWithReducer from "./AppWithReducer";
import {Provider} from "react-redux";
import AppWithRedux from "./AppWithRedux";
import {store} from "./Reducers/store";

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>,
    document.getElementById('root')
);


