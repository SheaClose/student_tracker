import {
  IS_AUTHED,
  GET_STUDENTS,
  GET_USER_INFO,
  UPDATE_DEFAULT_COHORT,
  GET_OUTLIERS,
  SELECT_COHORT
} from './actions';

const initialState = {
  isAuthed: false,
  pendingAuth: false,
  students: [],
  userInfo: {},
  defaultCohort: '',
  selectedCohort: ''
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
    window.location.href = `${process.env.REACT_APP_ROOT_PATH}/loginFailed`;
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
      userInfo: action.payload,
      defaultCohort: action.payload.default_cohort_id || ''
    });
  case `${UPDATE_DEFAULT_COHORT}_FULFILLED`:
    console.log('Successfully Updated Default Cohort to: ', action.payload);
    return Object.assign({}, state, {
      defaultCohort: action.payload
    });
  case `${GET_OUTLIERS}_FULFILLED`:
    return Object.assign({}, state, { outliers: action.payload });
  case `${SELECT_COHORT}`:
    return Object.assign({}, state, { selectedCohort: action.payload });
  default:
    return state;
  }
}
