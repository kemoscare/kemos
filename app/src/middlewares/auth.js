function actionPurpose(action) {
    const { type } = action
    const keyWords = type.split('_')
    return keyWords[0]
}

const auth = store => next => action => {
    const actionPurpose = actionPurpose(action)
    if(actionPurpose === 'REQUEST') {
        if(sessionStorage.token) {
            action.token = sessionStorage.token
            return next(action)
        }
    }
    return next(action)
}

