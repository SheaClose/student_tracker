import axios from 'axios';

export const IS_AUTHED = 'IS_AUTHED';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_USER_INFO = 'GET_USER_INFO';
export const UPDATE_DEFAULT_COHORT = 'UPDATE_DEFAULT_COHORT';
export const GET_OUTLIERS = 'GET_OUTLIERS';
export const SELECT_COHORT = 'SELECT_COHORT';
export const GET_ONEONONES = 'GET_ONEONONES';
export const ADD_ONEONONE = 'ADD_ONEONONE';
export const GET_STUDENT_DETAILS = 'GET_STUDENT_DETAILS';
export const GET_ATTENDANCE = 'GET_ATTENDANCE';
export const UPDATE_ATTENDANCE = 'UPDATE_ATTENDANCE';
export const SUBMIT_ATTENDANCE = 'SUBMIT_ATTENDANCE';
export const CLEAR_ATTENDANCE = 'CLEAR_ATTENDANCE';

export function verifyLogin() {
  return {
    type: IS_AUTHED,
    payload: axios
      .get('/api/isLogged')
      .then(res => res.data)
      .catch(console.log)
  };
}

export function getStudents(cohort) {
  return {
    type: GET_STUDENTS,
    payload: axios
      .get(`/api/students?cohort=${cohort}`)
      .then(res => res.data)
      .catch(console.log)
  };
}

export function getUserInfo() {
  return {
    type: GET_USER_INFO,
    payload: axios
      .get('/api/user/')
      .then(res => res.data)
      .catch(console.log)
  };
}

export function updateDefaultCohort(cohortName) {
  return {
    type: UPDATE_DEFAULT_COHORT,
    payload: axios
      .put('/api/user/default_cohort', { cohortName })
      .then(res => res.data)
      .catch(console.log)
  };
}

export function getOutliers() {
  return {
    type: GET_OUTLIERS,
    payload: axios
      .get('/api/outliers')
      .then(res => res.data)
      .catch(console.log)
  };
}

export function selectCohort(cohort) {
  return {
    type: SELECT_COHORT,
    payload: cohort
  };
}

export function getOneOnOnes(cohort) {
  return {
    type: GET_ONEONONES,
    payload: axios
      .get(`/api/oneonones?cohort=${cohort}`)
      .then(res => res.data)
      .catch(console.log)
  };
}

export function addOneOnOne(data) {
  return {
    type: ADD_ONEONONE,
    payload: axios
      .post('/api/oneonones', data)
      .then(res => res.data)
      .catch(console.log)
  };
}

export function getStudentDetails(dm_id) {
  return {
    type: GET_STUDENT_DETAILS,
    payload: axios
      .get(`/api/students/${dm_id}`)
      .then(res => res.data)
      .catch(err => console.log('Could not get student details', err))
  };
}

export function getAttendance(cohort, date) {
  return {
    type: GET_ATTENDANCE,
    payload: axios
      .get(`/api/attendance/?cohort_id=${cohort}&date=${date}`)
      .then(res => res.data)
      .catch(console.log)
  };
}

export function submitAttendance(values, cohort_id, date) {
  return {
    type: SUBMIT_ATTENDANCE,
    payload: axios
      .post('/api/attendance', { values, cohort_id, date })
      .then(res => res.data)
      .catch(console.log)
  };
}

export function updateAttendance(timeframe, date, value = '0', dm_id) {
  console.log(date);
  return {
    type: UPDATE_ATTENDANCE,
    payload: {
      timeframe,
      value,
      dm_id,
      date
    }
  };
}

export function clearAttendance() {
  return {
    type: CLEAR_ATTENDANCE,
    payload: []
  };
}
