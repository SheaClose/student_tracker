import axios from 'axios';

export const GET_PROJECTS = 'GET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_COMPLETION = 'UPDATE_COMPLETION';
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

export function updateCompletion(project_id, completion, cohort_id) {
  return {
    type: UPDATE_COMPLETION,
    payload: axios
      .put(`/api/projects/completion/${project_id}`, { completion, cohort_id })
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
