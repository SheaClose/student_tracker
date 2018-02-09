import { GET_PROJECTS, UPDATE_COMPLETION } from './actions';

const initialState = {
  loading: true,
  projects: []
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
  case `${GET_PROJECTS}_PENDING`:
    return Object.assign({}, state, {
      loading: true
    });
  case `${GET_PROJECTS}_FULFILLED`:
    return Object.assign({}, state, {
      projects: action.payload,
      loading: false
    });
  case `${GET_PROJECTS}_REJECTED`:
    return Object.assign({}, state, {
      loading: true
    });
  case `${UPDATE_COMPLETION}_FULFILLED`:
    return Object.assign({}, state, {
      projects: action.payload
    });

  default:
    return state;
  }
}
