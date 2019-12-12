import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/table/lib/css/table.css'
import KemosRouter from './Router'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <BrowserRouter>
   <KemosRouter />
  </BrowserRouter>
 ), document.getElementById('root')
);
//registerServiceWorker();
