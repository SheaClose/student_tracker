import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';

import AfternoonProjects from './AfternoonProjects/AfternoonProjects';
import MajorProjects from './MajorProjects/MajorProjects';
import { MasterDetail, Master } from '../Utils/MasterDetail';

import { getProjects } from '../../ducks/projects/actions';
// import Configuration from './Configuration/Configuration';

class Projects extends Component {
  componentDidMount() {
    this.props.getProjects(
      this.props.selectedCohort || this.props.defaultCohort
    );
  }

  render() {
    console.log(this.props);
    const { projects = [] } = this.props;
    return (
      <MasterDetail>
        <Master list={projects} renderMethod={project => project.name} />
      </MasterDetail>
    );
  }
  // render() {
  //   return (
  //     <Tabs>
  //       <Tab label="Afternoon Projects">
  //         <AfternoonProjects />
  //       </Tab>
  //       {/* list, primary = name, second = 1. number complete 7/12, 2. oldest incomplete */}
  //       <Tab label="Major Projects">
  //         <MajorProjects />
  //       </Tab>
  //     </Tabs>
  //   );
  // }
}
const mapStateToProps = ({ projectsReducer, mainReducer }) => {
  const { projects } = projectsReducer;
  const { selectedCohort, defaultCohort } = mainReducer;
  return { projects, selectedCohort, defaultCohort };
};
export default connect(mapStateToProps, { getProjects })(Projects);
