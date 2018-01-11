import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import projectsReducer from './projects/reducer';
import reducer from './reducer';

const reducers = combineReducers({ mainReducer: reducer, projectsReducer });

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
);
