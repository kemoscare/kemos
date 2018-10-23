import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'
import { BrowserRouter } from 'react-router-dom'

import './index.css';
import Router from './Router'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
   <Router />
  </BrowserRouter>
 ), document.getElementById('root')
);
registerServiceWorker();
