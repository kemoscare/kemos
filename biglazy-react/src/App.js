import React, { Component } from 'react';
import './App.css';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Panes from './Tab'
const api = require('./api-' + process.env.NODE_ENV)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tree: [],
      chemotherapies: [],
      submission: {},
      themes: []
    }
    console.log(process.env)
  }

  fetchThemes() {
    fetch(api.server + 'themes')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        this.setState({ themeResponse: data})
        
      })
  }

  componentDidMount() {
    this.fetchThemes()
  }

  submit = (payload) => {
    fetch(api.server, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    }).then(o => {
      this.fetchChemo(this.state.submission.data.hexId)
      this.fetchThemes()
      
    })
    
  }

  fetchChemo = (id) => {
    const url = api.server + id
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({submission: { data: data}}))
  }

  resetForm = () => {
    this.setState({
      submission: {}
    })
  }

  render() {

    const { chemotherapies, submission, themeResponse } = this.state
    return (
      <div className="App">
        <div className="flex-box">
          <Sidebar themeResponse={themeResponse} itemClicked={this.onChemoClick} addChemo={this.resetForm} actionFunc={this.fetchChemo}/>
          <div className="form-component">
            <div id="Topbar">
              <span className="KEMOS">KEMOS</span><span className="CARE">.CARE</span>
            </div>
            <Panes chemotherapy={submission} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
