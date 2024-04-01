type actionType = {
  type: string,
  payload?: number,
}

export type stateType = {
  counter: number,
}

const initialState = {counter: 0};

// reducer должен зависеть только от state и action. 
// Он должен быть чистым без каких-либо побочных эффектов.
// Также должен соблюдаться принцип иммутабельностти
const reducer = (state: stateType = initialState, action: actionType) => {
  switch (action.type) {
    // всё прописывают в верхнем регистре -- внегласное правило
    case 'INC':
      return {
        ...state,
        counter: state.counter + 1
      }
    case 'DEC':
      return {
        ...state,
        counter: state.counter - 1
      }
    case 'RND':
      return {
        ...state,
        counter: state.counter * action.payload!
      }
    default: return state;
  }
}

export default reducer;