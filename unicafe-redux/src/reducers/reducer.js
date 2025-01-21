const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':{ initialState.good++
      return initialState}
    case 'OK':{
      initialState.ok++
      return initialState
    }
    case 'BAD':{
      initialState.bad++
      return initialState}
    case 'RESET':{
      initialState.bad = initialState.good = initialState.ok = 0
      return initialState
    }
    default: return initialState
  }
}

export default counterReducer