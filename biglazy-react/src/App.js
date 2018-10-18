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
      themes: [],
      chemoLoading: true,
      newChemo: false
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
    this.fetchNames()
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

  fetchNames() {
    this.setState({namesLoading: true})
    fetch(api.server + "names/")
        .then(response => response.json())
        .then(json => this.setState({contentTree: json, namesLoading: false}))
  }

  fetchChemo = (id) => {
    this.setState({chemoLoading: true})
    
    const f = () => {
        const url = api.server + id
        console.log(url)
        fetch(url)
          .then(response => response.json())
          .then(data => this.setState({selectedProtocol: data, chemoLoading: false}))
      }
    setTimeout(f, 0)
  }

  resetForm = () => {
    this.setState({
      selectedProtocol: {},
      chemoLoading: false,
      newChemo: true
    })
  }

  render() {

    const { selectedProtocol, contentTree, chemoLoading, newChemo } = this.state
    return (
      <div className="App">
        <div className="flex-box">
          <Sidebar actionFunc={this.fetchChemo} contentTree={contentTree} reset={this.resetForm}/>
          <div className="form-component">
            <div id="Topbar">
              <span className="KEMOS">KEMOS</span><span className="CARE">.CARE</span>
            </div>
            <Panes selectedProtocol={selectedProtocol} submit={this.submit} loading={chemoLoading} newChemo={newChemo}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
