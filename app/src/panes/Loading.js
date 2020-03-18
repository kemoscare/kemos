import React from 'react'
import {
    FormGroup, Classes, InputGroup, Button, Switch, Intent, NonIdealState
} from '@blueprintjs/core'
import { DatePicker } from '@blueprintjs/datetime'

export const ProtocolLoading = () => (
    <div>
        <div className="displayComponent">
            <div>
                <div className="right-elements">
                    <FormGroup className="left-elements" className={Classes.SKELETON} label="Date de prescription">
                        <DatePicker />
                    </FormGroup>
                    <FormGroup label="Diagnostic" label-for="diagnostic" className="diagnosis" className={Classes.SKELETON}>
                        <InputGroup name="diagnosis" placeholder="Diagnostic" className={Classes.SKELETON}/>
                    </FormGroup>
                    <FormGroup label="Nom du médecin référent" label-for="medecin-referent" className="ref-practionner" className={Classes.SKELETON}>
                        <InputGroup id="medecin-referent" name="referentMD" placeholder="Médecin référent" />
                    </FormGroup>
                    <FormGroup label="Protocole" label-for="protocol" className="protocol-name" className={Classes.SKELETON}>
                        {"none"}
                    </FormGroup>
                    <FormGroup label="Afficher les traitements à domicile" label-for="cycleCount" className={Classes.SKELETON}>
                        <Button className="print-button" intent={Intent.PRIMARY} text="Imprimer" icon="print" />
                        <Switch inline large name="showAtHomeTreaments" label=""/>
                    </FormGroup>
                </div>
            </div>
        </div>
    </div>
    )

export const PlanNonIdeal = () => (
                <NonIdealState
                    className="nonIdealState"
                    icon="search"
                    title="Plan personnalisé de soin"
                    description="Selectionnez un protocole dans la liste de gauche"
                    />
)


