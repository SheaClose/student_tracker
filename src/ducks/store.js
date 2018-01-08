import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { projectsReducer } from './projects/reducer';
import reducer from './reducer';

export default createStore(reducer, projectsReducer, composeWithDevTools(applyMiddleware(promiseMiddleware())));
