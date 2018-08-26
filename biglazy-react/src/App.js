import React, { Component } from 'react';
import './App.css';

import { Form } from 'react-formio'
import Topbar from './Topbar';
import Sidebar from './Sidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Topbar/>
        <div className="flex-box">
          <Sidebar/>
          <div className="form-component">
            <Form src="https://dmfmzapzzsicedw.form.io/biglazy" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
