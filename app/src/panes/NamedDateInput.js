import React, { Component } from 'react'
import moment from 'moment'
import { DateInput } from '@blueprintjs/datetime'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'

class NamedDateInput extends Component {

    dateInputFormatter = (format) => {
        return {
            formatDate: (date, locale) => moment(date).format(format),
            parseDate: (str, locale) => moment(str, format).toDate(),
            placeholder: format,
            maxDate: moment().add({year: 5}).toDate()
        }
    }

    handleDateChange = (date) => {
        this.props.onDateChange(this.props.name, date)
    }
    render() {
        return (
            <DateInput {...this.dateInputFormatter("dddd Do MMMM YYYY")} onChange={this.handleDateChange} value={this.props.value} />
        )
    }
}

export default NamedDateInput