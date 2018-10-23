import React, { Component } from 'react'
import './PPS.css'
import { InputGroup, FormGroup, HTMLTable } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import moment from 'moment'
import 'moment/locale/fr'

class PPS extends Component {

    constructor() {
        super()
        moment.locale("fr")
        this.state = {date: new Date()}
    }

    calculatePlanning = () => {
        const { protocol } = this.props
        const { date } = this.state
        // build array of days
        let dayElements = protocol.days
        console.log(protocol.days)
        let days = dayElements.flatMap((dayElement) => {
            let { day } = dayElement
            if(day.length > 2) {
                let firstDay = parseInt(day.split("-")[0], 10)
                let lastDay = parseInt(day.split("-")[1], 10)
                let days = []
                for(let i = firstDay;i<lastDay+1;i++) {
                    days.push({...dayElement, day: i})
                }
                return days;
            } else {
                return {...dayElement, day: parseInt(day, 10)}
            }
        })
        let rdv = days.map((day) => {
            if(day.day === 1 || day.day === 0) {
                return { date: moment(date).format("dddd, Do MMMM YYYY"), type: "Traitement", ...day}
            } else {
                return { date: moment(date).add(day.day, 'days').format("dddd, Do MMMM YYYY"), type: "Traitement", ...day}
            }
            
        })
        rdv.sort((d1, d2) => d1 > d2)
    
        return rdv    


    }

    dayComponent = (day) => (
        <tr>
            <td>{day.type}</td>
            <td>{day.date}</td>
            <td>{day.careMode === "Admission" ? "Hospitalisation" : "Hopital de jour"}</td>
        </tr>
    )

    dateInputFormatter = (format) => {
        return {
            formatDate: (date, locale) => moment(date).locale(locale).format(format),
            parseDate: (str, locale) => moment(str, format).locale(locale).toDate(),
            placeholder: format,
            maxDate: moment().add({year: 5}).toDate()
        }
    }

    handleDateChange = (date) => {
        this.setState({date: date})
    }
    

    render() {
        const {protocol, chemoLoading} = this.props
        if(chemoLoading) {
            return "loading"
        } else {
            moment.locale("fr")
            let days = this.calculatePlanning()
            return (
                <div className="pps-grid">
                    <div className="patient-tag">
                        Étiquette patient
                    </div>
                    <FormGroup label="Diagnostic" label-for="diagnostic" className="diagnosis">
                        <InputGroup defaultValue={"Cancer " + protocol.organ ? protocol.organ : protocol.theme} />
                    </FormGroup>
                    <FormGroup label="Nom du médecin référent" label-for="medecin-referent" className="ref-practionner">
                        <InputGroup id="medecin-referent" placeholder="Médecin référent" />
                    </FormGroup>
                    <FormGroup label="Protocole" label-for="protocol" className="protocol-name">
                        {protocol.name}
                    </FormGroup>
                    <FormGroup label="Date de prescription" label-for="prescription-date" className="prescription-date">
                        <DateInput {...this.dateInputFormatter("ddd Do MMMM YYYY")} defaultValue={new Date()} onChange={this.handleDateChange} locale="fr" />
                    </FormGroup>
                    
                        
                    <div className="appointments">
                        <HTMLTable>
                            <thead>
                                <tr>
                                    <th>Rendez vous</th>
                                    <th>Date</th>
                                    <th>à</th>
                                </tr>
                            </thead>
                            <tbody>
                                { days.map(day => this.dayComponent(day)) }
                            </tbody>
                        </HTMLTable>
                    </div>
                </div>
            )
            
        }
    }
    
}

export default PPS