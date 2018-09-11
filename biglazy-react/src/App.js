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

  loadChemos() {
    fetch("http://localhost:8080/biglazy")
    .then(response => response.json())
    .then(data => this.setState({chemotherapies: data, submission: {}}))
    .then(data => console.log(data))
  }

  componentDidMount() {
    this.loadChemos()
  }

  submit = (payload) => {
    fetch('http://localhost:8080/biglazy/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    }).then(o => {
      this.loadChemos()
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

    // const submissionObject = {
    //   owner: null,
    //   deleted: null,
    //   roles: [],
    //   _vid: 0,
    //   _fvid: 0,
    //   state: "submitted",
    //   _id: "",
    //   access: [],
    //   metadata:{
    //     offset: -600,
    //     referrer: "",
    //     browserName: "",
    //     userAgent: "",
    //     pathName: "",
    //     onLine: false
    //   },
    //   form: "",
    //   externalIds: [],
    //   externalTokens: [],
    //   created: "",
    //   modified:"",
    //   __v: 0,
    //   data: this.state.chemotherapies[id]
    // }

    const submissionObject = { data: this.state.chemotherapies[id]}
    console.log(submissionObject)
    this.setState({
      chemotherapies: this.state.chemotherapies,
      submission: submissionObject
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
            <Form form={formJSON} onSubmit={this.submit} submission={submission} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
