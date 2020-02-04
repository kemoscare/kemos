import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'
import KemosRouter from './Router'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { rootReducer } from './reducers/reducers'

const logger = createLogger({})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
       <KemosRouter />
      </BrowserRouter>
    </Provider>
 ), document.getElementById('root')
);
//registerServiceWorker();
