import { IS_AUTHED, STUDENTS, USER_INFO } from './actions';
import { rootPath } from '../resources/resources';

const initialState = {
  isAuthed: false,
  pendingAuth: false,
  students: [],
  userInfo: []
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
  case `${STUDENTS}_FULFILLED`:
    return Object.assign({}, state, {
      students: action.payload
    });
  case `${STUDENTS}_PENDING`:
    return Object.assign({}, state);
  case `${STUDENTS}_REFECTED`:
    return Object.assign({}, state);
  case `${USER_INFO}_FUFILLED`:
    return Object.assign({}, state, {
      userInfo: action.payload
    });
  case `${USER_INFO}_PENDING`:
    return Object.assign({}, state);
  case `${USER_INFO}_REJECTED`:
    return Object.assign({}, state);
  default:
    return state;
  }
}
