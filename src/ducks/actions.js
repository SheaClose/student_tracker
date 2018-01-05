import axios from 'axios';

export const IS_AUTHED = 'IS_AUTHED';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_USER_INFO = 'GET_USER_INFO';
export const UPDATE_DEFAULT_COHORT = 'UPDATE_DEFAULT_COHORT';

export function verifyLogin() {
  return {
    type: IS_AUTHED,
    payload: axios
      .get('/api/isLogged')
      .then(res => res.data)
      .catch(console.log)
  };
}

export function getStudents() {
  return {
    type: GET_STUDENTS,
    payload: axios
      .get('/api/students/')
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
