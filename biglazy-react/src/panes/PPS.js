import React, { Component } from 'react'
import './PPS.css'
import { InputGroup, FormGroup, HTMLTable, Classes, Intent, NumericInput, Icon, Button, Switch, NonIdealState } from '@blueprintjs/core';
import moment from 'moment'
import 'moment/locale/fr'
import DateInput from './NamedDateInput'
import { calculatePlanning } from './calculatePlanning'
import { DatePicker } from '@blueprintjs/datetime';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import PrintablePPS from './PrintablePPS'
import {PrintProvider, Print, NoPrint} from 'react-easy-print'

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

    handleHomeChange = (event) => {
        this.props.pps.showAtHomeTreaments = event.target.checked
        this.props.pps.days = calculatePlanning(this.props.protocol, this.props.pps.startDate, event.target.checked)
        this.setState(this.state)
    }

    handleDateChange = (name, date) => {
        if(name === "startDate") {
            this.props.pps.startDate = moment(date).startOf('day')
            this.props.pps.days = calculatePlanning(this.props.protocol, this.props.pps.startDate, this.props.pps.cycleCount)
        } else {
            this.props.pps.days[name].date = moment(date).startOf('day')
        }
        this.setState(this.state)
    }


    handleStartDateChange = (date) => {
        this.props.pps.startDate = moment(date)
        this.props.pps.days = calculatePlanning(this.props.protocol, this.props.pps.startDate, this.props.pps.cycleCount)
        this.setState(this.state)
    }

    dayComponent = (day) => (
        <tr className={day.type === "Reevaluation" && "evaluation"} intent={day.evaluation && Intent.SUCCESS} key={day.id}>
            <td>{day.type}</td>
            <td>{day.products && day.products.join(", ")}</td>
            <td>{<DateInput name={day.id} onDateChange={this.handleDateChange} value={day.date.toDate()} />}</td>
            <td>{day.careMode === "Admission" && "Hospitalisation"}
                {day.careMode === "Home" && "À Domicile"}
                {day.careMode === "DayCare" && "Hopital de jour"}</td>
            <td>{day.type === "Reevaluation" && this.showEvaluation(day) }</td>
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
        const {protocol, chemoLoading, nonIdeal} = this.props
        const { days } = this.props.pps
        if(chemoLoading) {
            return "loading"
        } else if(nonIdeal) {
            return (
                <NonIdealState
                    icon="search"
                    title="Plan personnalisé de soin"
                    description="Selectionnez un protocole dans la liste de gauche"
                    />
            )
        } else {
            moment.locale("fr")
            return (
            <div>
                <div className="printComponent">
                    <PrintablePPS pps={this.props.pps} protocol={protocol} />
                </div>
                <div className="displayComponent">
                    <div>
                        <div className="right-elements">
                            <FormGroup className="left-elements" label="Date de prescription">
                                <DatePicker onChange={this.handleStartDateChange} value={this.props.pps.startDate.toDate()} maxDate={moment().add({year: 5}).toDate()} />
                            </FormGroup>
                            <FormGroup label="Diagnostic" label-for="diagnostic" className="diagnosis">
                                <InputGroup name="diagnosis" value={this.props.pps.diagnosis} onChange={this.handleInputChange} placeholder="Diagnostic"/>
                            </FormGroup>
                            <FormGroup label="Nom du médecin référent" label-for="medecin-referent" className="ref-practionner">
                                <InputGroup id="medecin-referent" name="referentMD" value={this.props.pps.referentMD} onChange={this.handleInputChange} placeholder="Médecin référent" />
                            </FormGroup>
                            <FormGroup label="Protocole" label-for="protocol" className="protocol-name">
                                {protocol.name}
                            </FormGroup>
                            <FormGroup label="Afficher les traitements à domicile" label-for="cycleCount">
                                <Button className="print-button" intent={Intent.PRIMARY} text="Imprimer" icon="print" onClick={() => window.print()} />
                                <Switch inline large name="showAtHomeTreaments" onChange={this.handleHomeChange} checked={this.props.pps.showAtHomeTreaments} label=""/>
                            </FormGroup>
                        </div> 

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
                </div>
            </div>
                
            )
            
        }
    }
    
}

export default PPS