import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { rootReducer } from './reducers/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { auth } from './middlewares/auth'
import { submission } from './middlewares/submission'
import { api } from './middlewares/api'
import date from './middlewares/date'

const logger = createLogger({})
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware, logger, auth, submission, api, date)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
//registerServiceWorker();
