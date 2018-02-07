import axios from 'axios';

export const GET_PROJECTS = 'GET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export function getProjects(cohortid) {
  return {
    type: GET_PROJECTS,
    payload: axios
      .get(`/api/projects/${cohortid}`)
      .then(res => res.data)
      .catch(console.log)
  };
}

export function addProjects(cohortid, project) {
  return {
    type: ADD_PROJECT,
    payload: axios.post('/api/projects/', { cohortid, project })
  };
}
