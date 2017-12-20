import { EXAMPLE_ACTION } from './actions';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case EXAMPLE_ACTION:
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
}
