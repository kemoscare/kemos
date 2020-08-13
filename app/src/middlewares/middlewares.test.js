import date from './date'
import { camelCase } from 'lodash'

function create(middleware) {
    const store = {
        dispatch: jest.fn(() => ({})),
        getState: jest.fn(),
    }

    const next = jest.fn()

    const invoke = action => middleware(store)(next)(action)
    return { store, next, invoke }
}

describe('Test Middlewares', () => {
    it('Tests `date` adding a dispatchedAt property', () => {
        const { store, next, invoke } = create(date)
        const anyAction = { type: 'ANY_ACTION' }
        expect(anyAction).not.toHaveProperty('dispatchedAt')
        invoke(anyAction)
        expect(anyAction).toHaveProperty('dispatchedAt')
    })
})
