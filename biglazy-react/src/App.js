import React, { Component } from 'react';
import './App.css';

import { Form } from 'react-formio'
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import formJSON from './form'
const api = require('./api-' + process.env.NODE_ENV)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chemotherapies: [],
      submission: {}
    }
    console.log(process.env)
  }

  fetchChemos() {
    fetch(api.server + 'biglazy')
    .then(response => response.json())
    .then(data => this.setState({chemotherapies: data, submission: {}}))
    .then(data => console.log(data))
  }



  componentDidMount() {
    this.fetchChemos()
  }

  submit = (payload) => {
    fetch(api.server + 'biglazy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    }).then(o => {
      this.fetchChemos()
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

    const submissionObject = { data: this.state.chemotherapies[id]}
    console.log(submissionObject)
    this.setState({
      chemotherapies: this.state.chemotherapies,
      submission: submissionObject
    })
  }

  resetForm = () => {
    this.setState({
      submission: {}
    })
  }

  render() {

    const { chemotherapies, submission } = this.state

    return (
      <div className="App">
        <Topbar/>
        <div className="flex-box">
          <Sidebar chemotherapies={chemotherapies} itemClicked={this.onChemoClick} resetForm={this.resetForm}/>
          <div className="form-component">
            <Form form={formJSON} onSubmit={this.submit} submission={submission} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
