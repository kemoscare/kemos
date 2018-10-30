import React, { Component } from 'react';
import './App.css';

import {makeTokenHeaders} from './utils'
import Sidebar from './Sidebar';
import Panes from './Tabs'
import { DISCONNECTED } from './flashes'
import Topbar from './Topbar';

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
      newChemo: false,
      formContent: {
        theme: "urologie",
        organ: "prostate",
        name: "",
        dayOneEquals: 0,
        radio_radiochimiottt: "chimiotherapie",
        evaluations: [
            {dayAfter: 0, delay:0, imagery: false, consultation: false}
        ],
        days: [
            {day: "", products: [""], careMode: "DayCare", careGalenic: "IntraVeinous"}
        ]
    }
    }
  }
  componentDidMount() {
    this.fetchNames()
    this.fetchUser()
  }

  submit = (payload) => {
    console.log(payload)
    this.setState({ sendingChemoLoading: true})
    fetch(api.server + 'protocols/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(json => {
        const f = () => { 
          this.setState({formContent: json, sendingChemoLoading: false, newChemo: false})
          this.fetchNames(json._id)
        }
        setTimeout(f, 0)
    })

    
  }

  fetchNames(lastInsertedId) {
    this.setState({namesLoading: true})
    const f = () => {
      fetch(api.server + "protocols/names/", {
        headers: makeTokenHeaders(sessionStorage.token)
      })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => this.setState({contentTree: json, namesLoading: false, shouldSelect: lastInsertedId}))
        .catch(response => {console.log(this.props.token);this.props.handleDisconnection(DISCONNECTED)})}
    setTimeout(f, 0)
  }

  fetchUser() {
    fetch(api.server + "users/", {
      headers: makeTokenHeaders(sessionStorage.token)
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => this.setState({user: data}))
  }

  fetchChemo = (id) => {
    this.setState({chemoLoading: true})
    
    const f = () => {
        const url = api.server + 'protocols/' + id
        fetch(url, {headers: makeTokenHeaders(sessionStorage.token)})
          .then(response => response.ok ? response.json() : Promise.reject(response))
          .then(data => this.setState({formContent: data, chemoLoading: false, sendingChemoLoading: false}))
          .catch(response => console.log(response))
      }
    setTimeout(f, 0)
  }

  resetForm = () => {
    this.setState({
      formContent: {
        theme: "urologie",
        organ: "prostate",
        name: "",
        dayOneEquals: 0,
        radio_radiochimiottt: "chimiotherapie",
        evaluations: [
            {dayAfter: null, delay:0, imagery: false, consultation: false}
        ],
        days: [
            {day: "", products: [""], careMode: "DayCare", careGalenic: "IntraVeinous"}
        ]
      },
      chemoLoading: false,
      sendingChemoLoading: false,
      newChemo: true
    })
    
  }

  render() {

    const { formContent, 
            contentTree, 
            chemoLoading, 
            newChemo, 
            shouldSelect, 
            sendingChemoLoading, 
            namesLoading,
            user } = this.state
    return (
      <div className="App">
        <div className="flex-box">
          <Sidebar actionFunc={this.fetchChemo} contentTree={contentTree} reset={this.resetForm} shouldSelect={shouldSelect} namesLoading={namesLoading}/>
          <div className="page-right">
            <Topbar user={user }/>
            <Panes className="form-component" formContent={formContent} submit={this.submit} chemoLoading={chemoLoading} newChemo={newChemo} sendingChemoLoading={sendingChemoLoading}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
