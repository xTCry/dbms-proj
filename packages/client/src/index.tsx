import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/ru';

import store from './store';
import * as serviceWorker from './serviceWorker';
import App from './containers/App';

import './index.css';

moment.locale('ru');
ReactDOM.render(
    <Provider store={store}>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <App />
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
