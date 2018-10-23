import React, { Component } from 'react'
import { FormGroup, 
         InputGroup, 
         HTMLSelect, 
         Radio, 
         RadioGroup, 
         ControlGroup, 
         Button,
         Intent,
         Divider,
         Classes
        } from '@blueprintjs/core'
import selectContent from './selectContent'
import FormEvaluation from './FormComponents/FormEvaluation'
import FormDay from './FormComponents/FormDay'

class Form extends Component {

    constructor() {
        super()
        this.state = {
            components: {
                evaluations: [
                ],
                days: [],
                products: []
            },
        }        
    }


    handleRadioChange = (event) => {
        this.props.formContent[event.target.name] = event.target.value
        if(event.target.name === "theme") {
            this.props.formContent.organ = ""
        }
        this.setState(this.state)
    }

    handleTextInputChange = (event) => {
        this.props.formContent[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleSelectChange = (event) => {
        this.props.formContent[event.target.name] = event.target.value
        this.setState(this.state)
    }

    render() {

        let { formContent, chemoLoading, sendingChemoLoading } = this.props
        if(chemoLoading) {
            return (
                <div>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                    <p className={Classes.SKELETON}>Lorem Ipsum</p>
                </div>
            )
        } else {
            return (
                <div className="bp3-ui-text">
                    <FormGroup label="Thème" labelFor="select-theme">
                        <HTMLSelect name="theme" onChange={this.handleSelectChange} value={formContent.theme} id="select-theme" options={selectContent.themes} fill={true}/>
                    </FormGroup>
                    <FormGroup label="Organe" labelFor="select-organ">
                        <HTMLSelect name="organ" id="organ" options={selectContent.organs[formContent.theme]} value={formContent.organ} onChange={this.handleSelectChange} fill={true}/>
                    </FormGroup>
                    <RadioGroup onChange={this.handleRadioChange} name="radio_radiochimiottt" label="Catégorie" inline selectedValue={formContent.radio_radiochimiottt}>
                        <Radio label="Chimiothérapie" value="Chimiotherapie"/>
                        <Radio label="Radio-Chimiothérapie" value="Radiochimiotherapie" />
                    </RadioGroup>
                    <ControlGroup>
                        <FormGroup inline label="Protocole de chimiothérapie" labelFor="protocol-name">
                            <InputGroup name="name" onChange={this.handleTextInputChange} placeholder="Nom du protocole" value={formContent.name}/>
                        </FormGroup>   
                        &nbsp;&nbsp;&nbsp;
                        <FormGroup inline label="J1 = J" labelFor="dayOneEquals" >
                            <InputGroup name="dayOneEquals" onChange={this.handleTextInputChange} intent={Intent.SUCCESS} placeholder="0" id="dayOneEquals" value={formContent.dayOneEquals}/>
                        </FormGroup>
                    </ControlGroup>
                    
                    <FormEvaluation evaluations={formContent.evaluations || []} />
                    <Divider />
                    <FormDay days={formContent.days || []} />
                    <Divider />
                    <Button intent={Intent.PRIMARY} onClick={() => this.props.onSubmit(this.props.formContent)} loading={sendingChemoLoading}>Ajouter / Modifier</Button>
                </div>
            )
        }

    }
}

export default Form