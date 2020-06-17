import React, { Component } from 'react'
import './PPS.css'
import {
    InputGroup,
    FormGroup,
    HTMLTable,
    Classes,
    Intent,
    NumericInput,
    Icon,
    Button,
    Switch,
    NonIdealState,
} from '@blueprintjs/core'
import DateInput from './NamedDateInput'
import { calculatePlanning } from './calculatePlanning'
import { DatePicker } from '@blueprintjs/datetime'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import PrintablePPS from './PrintablePPS'
import { PrintProvider, Print, NoPrint } from 'react-easy-print'
import { ProtocolLoading, PlanNonIdeal } from './Loading'
import { connect } from 'react-redux'
import { uniqueName } from '../actions/form'
import {
    planInputChanged,
    planDateInputChanged,
    datesPlanDateInputChanged,
} from '../actions/plan'
import moment from 'moment'

const Date = ({ date, dispatch }) => (
    <tr
        className={date.type === 'Reevaluation' && 'evaluation'}
        intent={date.evaluation && Intent.SUCCESS}
        key={date.id}
    >
        <td>
            {date.type !== 'Reevaluation' && (
                <span className="day">J{date.day}</span>
            )}
        </td>
        <td>{date.type}</td>
        <td>{date.products && date.products.join(', ')}</td>
        <td>
            {
                <DateInput
                    name={'date'}
                    onDateChange={(name, changedDate) =>
                        dispatch(
                            datesPlanDateInputChanged(
                                name,
                                changedDate,
                                date.id
                            )
                        )
                    }
                    value={date.date.toDate()}
                />
            }
        </td>
        <td>
            {date.careMode === 'Admission' && 'Hospitalisation'}
            {date.careMode === 'Home' && 'À Domicile'}
            {date.careMode === 'DayCare' && 'Hopital de jour'}
        </td>
        <td>
            {date.type === 'Reevaluation' && <DateEvaluation date={date} />}{' '}
        </td>
    </tr>
)

const DateEvaluation = ({ date }) => (
    <div>
        {date.imagery && 'Imagerie'}
        {date.imagery && <br />}
        {date.consultation && 'Consultation'}
    </div>
)

const Plan = ({ loading, plan, dispatch }) => {
    if (loading === 'LOADING') {
        return <ProtocolLoading />
    }
    if (loading === 'NON_IDEAL') {
        return <PlanNonIdeal />
    }
    return (
        <div>
            <div className="displayComponent">
                <div>
                    <div className="right-elements">
                        <FormGroup
                            className="left-elements"
                            label="Date de prescription"
                        >
                            <DatePicker
                                name="startDate"
                                onChange={date =>
                                    dispatch(
                                        planDateInputChanged('startDate', date)
                                    )
                                }
                                value={plan.startDate.toDate()}
                                maxDate={plan.maxDate.toDate()}
                            />
                        </FormGroup>
                        <FormGroup
                            label="Diagnostic"
                            label-for="diagnostic"
                            className="diagnosis"
                        >
                            <InputGroup
                                name="diagnosis"
                                value={plan.diagnosis}
                                onChange={event =>
                                    dispatch(planInputChanged(event))
                                }
                                placeholder="Diagnostic"
                            />
                        </FormGroup>
                        <FormGroup
                            label="Nom du médecin référent"
                            label-for="medecin-referent"
                            className="ref-practionner"
                        >
                            <InputGroup
                                id="medecin-referent"
                                name="md"
                                value={plan.md}
                                onChange={event =>
                                    dispatch(planInputChanged(event))
                                }
                                placeholder="Médecin référent"
                            />
                        </FormGroup>
                        <FormGroup
                            label="Protocole"
                            label-for="protocol"
                            className="protocol-name"
                        >
                            {plan.protocol.name}
                        </FormGroup>
                        <FormGroup
                            label="Afficher les traitements à domicile"
                            label-for="cycleCount"
                        >
                            <Button
                                className="print-button"
                                intent={Intent.PRIMARY}
                                text="Imprimer"
                                icon="print"
                                onClick={() => window.print()}
                            />
                            <Switch
                                inline
                                large
                                name="showAtHomeTreaments"
                                onChange={event =>
                                    dispatch(planInputChanged(event))
                                }
                                checked={plan.showAtHomeTreatments}
                                label=""
                            />
                        </FormGroup>
                    </div>

                    <div className="appointments">
                        <HTMLTable>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Rendez vous</th>
                                    <th>Produits</th>
                                    <th>Date</th>
                                    <th>à</th>
                                    <th>Réévaluation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plan.dates &&
                                    plan.dates.map(date => (
                                        <Date date={date} dispatch={dispatch} />
                                    ))}
                            </tbody>
                        </HTMLTable>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { plan } = state
    console.log(plan.startDate)
    plan.maxDate = moment(plan.startDate).add({ year: 5 })
    return { plan }
}

export default connect(mapStateToProps)(Plan)
