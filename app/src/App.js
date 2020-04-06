import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Panes from './Panes'
import { DISCONNECTED } from './flashes'
import Topbar from './Topbar';
import moment from 'moment';
import { calculatePlanning } from './panes/calculatePlanning';
import { makeTokenHeaders, forEachNode, mapLabel} from './utils'
import { dispatch } from 'redux'
import { connect } from 'react-redux'
import { receivedProtocol, requestProtocol } from './actions/actions'

import { fetchUser } from './actions/users'

const api = require('./api-' + process.env.NODE_ENV)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tree: [],
      chemotherapies: [],
      selectedProtocol: {},
      themes: [],
      panes: {
        nonIdeal: true,
        chemoLoading: true,
        newChemo: false,
        pps: {
          days: [],
          startDate: moment(new Date()),
          cycleCount: 1
        },
        formContent: {
          theme: "general",
          organ: "",
          name: "",
          dayOneEquals: 0,
          radio_radiochimiottt: "chimiotherapie",
          evaluations: [
              {dayAfter: 0, delay:0, imagery: false, consultation: false}
          ],
          days: [
              {day: "", products: [""], careMode: "DayCare", careGalenic: "IntraVeinous"}
          ],
        }
      }
    }
  }
  componentDidMount() {
    this.fetchNames()
    const { dispatch } = this.props
    dispatch(fetchUser())
  }

  logout = () => {
    this.props.handleDisconnection(DISCONNECTED)
  }

  submit = (payload) => {
    console.log(payload)
    this.setState({ panes: {sendingChemoLoading: true, ...this.state.panes}})
    fetch(api.server + 'protocols/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`      
      },
      body: JSON.stringify(payload)
    }).then(response => response.ok ? response.json() : Promise.reject(response))
      .then(json => {
        const f = () => { 
          this.setState({panes: {formContent: json, sendingChemoLoading: false, newChemo: false, ...this.state.panes}})
          this.fetchNames(json._id)
        }
        setTimeout(f, 0)
    }).catch(response => this.setState({panes: {sendingChemoLoading: false, ...this.state.panes}}))

    
  }

  fetchNames(lastInsertedId) {
    this.setState({namesLoading: true})
    const f = () => {
      fetch(api.server + "protocols/names/", {
        headers: makeTokenHeaders(sessionStorage.token)
      })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => {
              forEachNode(json, mapLabel)
              this.setState({contentTree: json, namesLoading: false, shouldSelect: lastInsertedId})
          })
        .catch(response => {console.log(this.props.token);this.props.handleDisconnection(DISCONNECTED)})}
    setTimeout(f, 0)
  }

  fetchUser() {
    fetch(api.server + "users/", {
      headers: makeTokenHeaders(sessionStorage.token)
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => {
      console.log(data)
      window._paq.push(['setUserId', data.first_name+" "+data.last_name]);
      window._paq.push(['trackPageView']);
      this.setState({user: data})
    })
  }

  fetchChemo = (id) => {
    const { dispatch } = this.props
    this.setState({...this.state, chemoLoading: true})
    window._paq.push(['trackEvent', 'Chemo', id])
    dispatch(requestProtocol())
    const f = () => {
        const url = api.server + 'protocols/' + id
        fetch(url, {headers: makeTokenHeaders(sessionStorage.token)})
          .then(response => response.ok ? response.json() : Promise.reject(response))
          .then(data => { 
            const startDate = moment(new Date())
            this.setState({
              chemoLoading: false,
              panes: {
                nonIdeal: false,
                formContent: data, 
                sendingChemoLoading: false, 
                pps: {
                  nonIdeal: false,
                  showAtHomeTreatments: false,
                  days: calculatePlanning(data, startDate, false),
                  startDate: startDate,
                  cycleCount: 1
                },
              }})
            dispatch(receivedProtocol(data))
            })
          .catch(response => console.log(response))
      }
    setTimeout(f, 0)
  }

  resetForm = () => {
    this.setState({
      panes: {
        nonIdeal: false,
        formContent: {
          theme: "general",
          organ: "",
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
        pps: {
          showAtHomeTreatments: false,
          days: [],
          startDate: moment(new Date()),
          cycleCount: 1
        },
        chemoLoading: false,
        sendingChemoLoading: false,
        newChemo: true
      }
    })
    
  }

  render() {

    const { 
            contentTree, 
            shouldSelect, 
            namesLoading,
            user,
            chemoLoading } = this.state

    return (
      <div className="App">
        <div className="flex-box">
          <Sidebar user={user} actionFunc={this.fetchChemo} contentTree={contentTree} shouldSelect={shouldSelect} namesLoading={namesLoading}/>
          <div className="page-right">
            <Topbar reset={this.resetForm}/>
            <Panes />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
