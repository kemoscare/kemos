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
  }

  submit = (payload) => {
    console.log(payload)
    this.setState({ chemoLoading: true})
    fetch(api.server + 'new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(json => {
        this.setState({formContent: json, chemoLoading: false, newChemo: false})
        this.fetchNames(json._id)
    })

    
  }

  fetchNames(lastInsertedId) {
    this.setState({namesLoading: true})
    fetch(api.server + "names/")
        .then(response => response.json())
        .then(json => this.setState({contentTree: json, namesLoading: false, shouldSelect: lastInsertedId}))
  }

  fetchChemo = (id) => {
    this.setState({chemoLoading: true})
    
    const f = () => {
        const url = api.server + id
        fetch(url)
          .then(response => response.json())
          .then(data => this.setState({formContent: data, chemoLoading: false}))
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
      newChemo: true
    })
    
  }

  render() {

    const { formContent, contentTree, chemoLoading, newChemo, shouldSelect } = this.state
    return (
      <div className="App">
        <div className="flex-box">
          <Sidebar actionFunc={this.fetchChemo} contentTree={contentTree} reset={this.resetForm} shouldSelect={shouldSelect}/>
          <div className="form-component">
            <div id="Topbar">
              <span className="KEMOS">KEMOS</span><span className="CARE">.CARE</span>
            </div>
            <Panes formContent={formContent} submit={this.submit} loading={chemoLoading} newChemo={newChemo}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
