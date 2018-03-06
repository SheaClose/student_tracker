import {
  IS_AUTHED,
  GET_STUDENTS,
  GET_USER_INFO,
  UPDATE_DEFAULT_COHORT,
  GET_OUTLIERS,
  SELECT_COHORT,
  GET_ONEONONES,
  ADD_ONEONONE,
  GET_STUDENT_DETAILS,
  GET_ATTENDANCE,
  UPDATE_ATTENDANCE,
  SUBMIT_ATTENDANCE,
  CLEAR_ATTENDANCE,
  CLEAR_SNACKBAR
} from './actions';

const initialState = {
  isAuthed: false,
  pendingAuth: false,
  students: [],
  userInfo: {},
  defaultCohort: '',
  selectedCohort: '',
  studentDetails: {},
  oneOnOnes: [],
  attendance: [],
  updatedAttendance: [],
  snackbar: ''
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

  case `${GET_ONEONONES}_FULFILLED`:
    return Object.assign({}, state, { oneOnOnes: action.payload });
  case `${ADD_ONEONONE}_FULFILLED`:
    return Object.assign({}, state, {
      oneOnOnes: action.payload,
      snackbar: 'Successfully added one-on-one'
    });
  case `${GET_STUDENT_DETAILS}_FULFILLED`:
    return Object.assign({}, state, { studentDetails: action.payload });
  case `${GET_ATTENDANCE}_FULFILLED`:
    return Object.assign({}, state, { attendance: action.payload });
    /* eslint-disable no-case-declarations */
  case UPDATE_ATTENDANCE:
    /* TODO: This is trying to do way too much in one function */
    const updateFunction = ({ attendance = {}, ...student }) => {
      if (!action.payload.dm_id) {
        // update everybody if no dm_id is specified
        return Object.assign({}, student, {
          attendance: {
            ...attendance,
            date: action.payload.date,
            [action.payload.timeframe]: action.payload.value
          }
        });
      } else if (action.payload.dm_id === student.dm_id) {
        // update the one student if they're the student we're updating
        return Object.assign({}, student, {
          attendance: {
            ...attendance,
            date: action.payload.date,
            [action.payload.timeframe]: action.payload.value
          }
        });
      }
      return Object.assign({}, student, {
        attendance: {
          ...attendance,
          date: action.payload.date
        }
      });
    };

    const updatedAttendance = state.updatedAttendance.length
      ? state.updatedAttendance.map(updateFunction)
      : state.attendance.map(updateFunction);
    return Object.assign({}, state, { updatedAttendance });
    /* eslint-enable */
  case `${SUBMIT_ATTENDANCE}_REJECTED`:
    return Object.assign({}, state, {
      snackbar: 'Error updating attendance'
    });

  case `${SUBMIT_ATTENDANCE}_FULFILLED`:
    return Object.assign({}, state, {
      attendance: action.payload,
      updatedAttendance: [],
      snackbar: 'Attendance updated successfully'
    });

  case CLEAR_ATTENDANCE:
    return Object.assign({}, state, { updatedAttendance: [] });
  case CLEAR_SNACKBAR:
    return Object.assign({}, state, { snackbar: action.payload });
  default:
    return state;
  }
}
