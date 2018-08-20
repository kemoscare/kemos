import React, { Component } from 'react';
import './App.css';
import { Form } from 'react-formio'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form src="https://dmfmzapzzsicedw.form.io/biglazy" />
      </div>
    );
  }
}

export default App;
