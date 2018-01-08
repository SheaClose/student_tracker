import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import RepoDropDown from './../../../Utils/RepoDropDown';

export const AddProject = props => (
  <Fragment>
    <RepoDropDown
      selectProject={val => {
        props.selectProject(val);
      }}
    />
  </Fragment>
);

AddProject.proptypes = {
  selectProject: PropTypes.func
};
