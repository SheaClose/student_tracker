import { GET_PROJECTS, ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT } from './actions';

const initialState = {
  loading: true,
  projects: []
};

export function projectsReducer(state = initialState, action) {
  switch (action.type) {
  case `${GET_PROJECTS}PENDING`:
    return Object.assign({}, state, {
      loading: true
    });
  case `${GET_PROJECTS}FULFILLED`:
    return Object.assign({}, state, {
      isAuthed: action.payload,
      loading: false
    });
  case `${GET_PROJECTS}REJECTED`:
    return Object.assign({}, state, {
      loading: true
    });
  default:
    return state;
  }
}
