import { IS_AUTHED, GET_STUDENTS, GET_USER_INFO } from './actions';
import { rootPath } from '../resources/resources';

const initialState = {
  isAuthed: false,
  pendingAuth: false,
  students: [],
  userInfo: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case `${IS_AUTHED}_FULFILLED`:
    return Object.assign({}, state, {
      isAuthed: action.payload,
      pendingAuth: false
    });
  case `${IS_AUTHED}_PENDING`:
    return Object.assign({}, state, {
      pendingAuth: true
    });
  case `${IS_AUTHED}_REJECTED`:
    window.location.href = `${rootPath}/loginFailed`;
    return Object.assign({}, state, {
      pendingAuth: false,
      isAuthed: false
    });
  case `${GET_STUDENTS}_FULFILLED`:
    return Object.assign({}, state, {
      students: action.payload
    });
  case `${GET_USER_INFO}_FULFILLED`:
    return Object.assign({}, state, {
      userInfo: action.payload
    });
  default:
    return state;
  }
}
