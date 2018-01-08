import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectsTable from './ProjectsTable/ProjectsTable';
import { ConfigToolbar } from './Toolbar/Toolbar';
import { AddProject } from './AddProject/AddProject';
import { getProjects } from './../../../ducks/projects/actions';

import './styles.css';

export class Configuration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addProject: false,
      selected: '',
      selectedCohort: ''
    };
  }

  componentDidMount() {
    getProjects(this.state.selectedCohort || 'WDL10');
  }

  render() {
    return (
      <div>
        <ConfigToolbar
          addProject={() => {
            this.setState({ addProject: !this.state.addProject });
          }}
          selectCohort={val => {
            this.setState({ selectedCohort: val });
          }}
        />
        {this.state.addProject && (
          <AddProject
            selectProject={val => {
              this.setState({ selected: val });
            }}
          />
        )}
        <ProjectsTable addedProject={this.state.selected} />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, getProjects)(Configuration);
