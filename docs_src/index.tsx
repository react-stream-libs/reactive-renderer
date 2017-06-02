import 'console-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import 'bootstrap/dist/css/bootstrap.css';

const browserHistory = createBrowserHistory();

import App from './App';

const history = createBrowserHistory();

ReactDOM.render(
  <App
    history={history}
  />,
  document.getElementById('app')
);
