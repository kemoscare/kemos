export const auth = store => next => action => {
    const purpose = actionPurpose(action)[0]
    if(purpose === 'REQUEST') {
        if(sessionStorage.token) {
            action.token = sessionStorage.token
            return next(action)
        }
    }
    return next(action)
}

   
    
