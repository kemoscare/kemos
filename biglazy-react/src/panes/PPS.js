import React, { Component } from 'react'
import './PPS.css'
import { InputGroup, FormGroup, HTMLTable, Classes, Intent } from '@blueprintjs/core';
import moment from 'moment'
import 'moment/locale/fr'
import DateInput from './NamedDateInput'
import { calculatePlanning } from './calculatePlanning'

class PPS extends Component {

    constructor() {
        super()
        this.state = {}
        moment.locale("fr")
    }

    handleInputChange = (event) => {
        this.props.pps[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleDateChange = (name, date) => {
        if(name === "startDate") {
            this.props.pps.startDate = moment(date).startOf('day')
            this.props.pps.days = calculatePlanning(this.props.protocol, this.props.pps.startDate)
        } else {
            this.props.pps.days[name].date = moment(date).startOf('day')
        }
        this.setState(this.state)
    }

    dayComponent = (day) => (
        <tr className={day.evaluation && "evaluation"} intent={day.evaluation && Intent.SUCCESS} key={day.id}>
            <td>{day.type}</td>
            <td>{day.products.join(", ")}</td>
            <td>{<DateInput name={day.id} onDateChange={this.handleDateChange} value={day.date.toDate()} />}</td>
            <td>{day.careMode === "Admission" ? "Hospitalisation" : "Hopital de jour"}</td>
            <td>{day.evaluation && this.showEvaluation(day.evaluation)}</td>
        </tr>
    )

    showEvaluation = (evaluation) => {
        return (
            <div>
                {evaluation.imagery && "Imagerie"}{evaluation.imagery && <br />}
                {evaluation.consultation && "Consultation"}
            </div>
        )
    }
    
    render() {
        const {protocol, chemoLoading} = this.props
        const { days } = this.props.pps
        if(chemoLoading) {
            return "loading"
        } else {
            moment.locale("fr")
            return (
                <div className="pps-grid">
                    <div className="patient-tag">
                        Étiquette patient
                    </div>
                    <FormGroup label="Diagnostic" label-for="diagnostic" className="diagnosis">
                        <InputGroup name="diagnosis" value={this.props.pps.diagnosis} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup label="Nom du médecin référent" label-for="medecin-referent" className="ref-practionner">
                        <InputGroup id="medecin-referent" name="referentMD" value={this.props.pps.referentMD} onChange={this.handleInputChange} placeholder="Médecin référent" />
                    </FormGroup>
                    <FormGroup label="Protocole" label-for="protocol" className="protocol-name">
                        {protocol.name}
                    </FormGroup>
                    <FormGroup label="Date de prescription" label-for="prescription-date" className="prescription-date">
                        <DateInput name="startDate" onDateChange={this.handleDateChange} value={this.props.pps.startDate.toDate()} />
                    </FormGroup>
                    
                        
                    <div className="appointments">
                        <HTMLTable>
                            <thead>
                                <tr>
                                    <th>Rendez vous</th>
                                    <th>Produits</th>
                                    <th>Date</th>
                                    <th>à</th>
                                    <th>Réévaluation</th>
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