function actionPurpose(action) {
    const { type } = action
    const keyWords = type.split('_')
    return keyWords[0]
}

export const auth = store => next => action => {
    const purpose = actionPurpose(action)
    if(purpose === 'REQUEST') {
        if(sessionStorage.token) {
            action.token = sessionStorage.token
            return next(action)
        }
    }
    return next(action)
}

