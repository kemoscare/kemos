/* Returns an action by its keywords each representing its purpose in different ways
 * @param {object} action The action object, same as the one passed to the redux store
 * @return {array} The array of keywords
 */
export function actionPurpose(action) {
    const { type } = action
    const keyWords = type.split('_')
    return keyWords
}
