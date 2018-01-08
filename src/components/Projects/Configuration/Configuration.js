import React, { Component } from 'react';

import { ConfigToolbar } from './Toolbar/Toolbar';
import ProjectsTable from './ProjectsTable/ProjectsTable';
import { AddProject } from './AddProject/AddProject';

import './styles.css';

export default class Configuration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addProject: false,
      selected: ''
    };
  }

  render() {
    return (
      <div>
        <ConfigToolbar
          addProject={() => {
            this.setState({ addProject: !this.state.addProject });
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
