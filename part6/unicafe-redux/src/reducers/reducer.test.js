import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    counterReducer(state, action)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 2,
      ok: 0,
      bad: 0
    })
  })
  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState
    counterReducer(state, {type:'RESET'})
    deepFreeze(state)
    counterReducer(state, action)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 2,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    counterReducer(state, action)
    const newState = counterReducer(state, action)
    expect(newState.bad).toEqual(2)
  })

  test('reset sets state to 0', () => {
    const action = {
      type: 'OK'
    }
    const reset = {
      type: 'RESET'
    }
    const state = initialState

    deepFreeze(state)
    counterReducer(state, action)
    counterReducer(state, action)
    const newState = counterReducer(state, reset)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})