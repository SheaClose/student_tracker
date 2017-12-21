import axios from 'axios';

export const IS_AUTHED = 'IS_AUTHED';

export function verifyLogin() {
  return {
    type: IS_AUTHED,
    payload: axios
      .get('/api/isLogged')
      .then(res => res.data)
      .catch(console.log)
  };
}
