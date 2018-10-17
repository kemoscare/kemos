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
      selectedProtocol: {},
      themes: []
    }
    console.log(process.env)
  }

  fetchThemes() {
    // fetch(api.server + 'themes')
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data)
    //     this.setState({ themeResponse: data})
        
    //   })
  }

  componentDidMount() {
    this.fetchThemes()
  }

  submit = (payload) => {
    console.log(payload.data)
    delete payload.data["data"]
    fetch(api.server + 'new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    }).then(o => {
      console.log(o)
      this.fetchThemes()
      this.setState({selectedProtocol: payload})
    })
    
  }

  fetchChemo = (id) => {
    const url = api.server + id
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({selectedProtocol: data}))
  }

  resetForm = () => {
    this.setState({
      selectedProtocol: {}
    })
  }

  render() {

    const { selectedProtocol, themeResponse } = this.state
    return (
      <div className="App">
        <div className="flex-box">
          <Sidebar actionFunc={this.fetchChemo}/>
          <div className="form-component">
            <div id="Topbar">
              <span className="KEMOS">KEMOS</span><span className="CARE">.CARE</span>
            </div>
            <Panes selectedProtocol={selectedProtocol} submit={this.submit} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
