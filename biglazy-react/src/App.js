import React, { Component } from 'react';
import './App.css';

import { Form } from 'react-formio'
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import formJSON from './form'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chemotherapies: [],
      submission: {}
    }
  }

  submit = (payload) => {
    fetch('http://localhost:8080/biglazy/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    })
  }

  addToList = (payload) => {
    const {chemotherapies} = this.state
    const joined = chemotherapies.concat([JSON.parse(JSON.stringify(payload))]) //easy hack for deep copying as Form.io submission objects don't seem to be immutable
    this.setState({
      chemotherapies: joined,
      submission: {}
    })
    return true
  }

  onChemoClick = (id) => {
    console.log(id)
    const submission = JSON.parse(JSON.stringify(this.state.chemotherapies[id]))
    this.setState({
      chemotherapies: this.state.chemotherapies,
      submission: submission
    })
  }

  render() {

    const { chemotherapies, submission } = this.state

    return (
      <div className="App">
        <Topbar/>
        <div className="flex-box">
          <Sidebar chemolist={chemotherapies} chemoClicked={this.onChemoClick}/>
          <div className="form-component">
            <Form src="https://dmfmzapzzsicedw.form.io/biglazy" onSubmit={this.addToList} submission={submission} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
