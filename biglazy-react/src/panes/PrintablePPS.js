import React, { Component } from 'react'
import Logo from '../Logo'
import { H5, Intent, HTMLTable } from '@blueprintjs/core';
import './PrintablePPS.css'

class PrintablePPS extends Component {

    dayComponent = (day) => (
        <tr className={day.type === "Reevaluation" && "evaluation"} intent={day.evaluation && Intent.SUCCESS} key={day.id}>
            <td>{day.type}</td>
            <td>{day.products && day.products.join(", ")}</td>
            <td>{day.date.format("Do MMMM YYYY")}</td>
            <td>{day.careMode === "Admission" ? "Hospitalisation" : "Hopital de jour"}</td>
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
        const { pps, protocol } = this.props

        return (
            <div className="bp3-text-large PrintablePPS">
                <Logo className="Logo"/>
                <div className="floatBlock">
                    <div className="patientTag">Étiquette Patient</div>
                    <div className="referentMD">
                        <strong>Médecin référent</strong><br/>
                        {pps.referentMD}
                    </div>
                    <div className="prescriptionDate">
                        <strong>Date de prescription</strong><br />
                        {pps.startDate.format("dddd Do MMMM YYYY")}
                    </div>
                </div>
                <div className="protocol">
                    <strong>Protocole : </strong>
                    {protocol.name}
                </div>

                <div className="diagnosis">
                    <strong>Diagnostic posé : </strong>
                    {pps.diagnosis}
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
                                    { pps.days.map(day => this.dayComponent(day)) }
                                </tbody>
                            </HTMLTable>
                        </div>
            </div>
        )
    }
}

export default PrintablePPS