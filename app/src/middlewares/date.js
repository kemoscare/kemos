import moment from 'moment'

const date = store => next => action => {
    action.dispatchedAt = moment(new Date())
    return next(action)
}

export default date
