import React, { Component } from 'react'
import { Classes } from '@blueprintjs/core'
import { Form } from 'react-formio'
import formJSON from './form.json'


class FormIOForm extends Component {

    componentWillUnmount() {
        console.log("Component Will Unmount")
    }

    componentDidMount() {
        console.log("Component will mount")
    }

    onChange(param) {
        console.log("Form Changed with param : ")
        console.log(param)
    }

    render() {
        const { onSubmit, submission, loading } = this.props
        if(!loading) {
            return (
                <Form form={formJSON} onSubmit={onSubmit} onChange={this.onChange} submission={{data: submission}} />
            )
        } else {
            return (
                <div className={Classes.SKELETON}>
                    <Form from={formJSON} />
                </div>
            )
        }
    }
}

export default FormIOForm