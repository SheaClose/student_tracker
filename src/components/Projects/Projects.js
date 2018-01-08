import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import AfternoonProjects from './AfternoonProjects/AfternoonProjects';
import MajorProjects from './MajorProjects/MajorProjects';
import Configuration from './Configuration/Configuration';

import './projects.css';

class Projects extends Component {
  render() {
    return (
      <div className="view-container">
        <Tabs>
          <Tab label="Configuration">
            <Configuration />
          </Tab>
          <Tab label="Afternoon Projects">
            <AfternoonProjects />
          </Tab>
          <Tab label="Major Projects">
            <MajorProjects />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
export default Projects;
