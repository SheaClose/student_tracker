import axios from 'axios';

export const IS_AUTHED = 'IS_AUTHED';
export const STUDENTS = 'STUDENTS';
export const USER_INFO = 'USER_INFO';

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
    type: STUDENTS,
    paylod: axios
      .get('/api/students/')
      .then(res => res.data)
      .catch(console.log)
  };
}

export function getUserInfo() {
  return {
    type: USER_INFO,
    payload: axios
      .get('/api/user/')
      .then(res => res.data)
      .catch(console.log)
  };
}
