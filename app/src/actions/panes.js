export const TAB_CHANGED = 'TAB_CHANGED'

export function changeTab(newTabId) {
    return {
        type: TAB_CHANGED,
        newTabId
    }
}
