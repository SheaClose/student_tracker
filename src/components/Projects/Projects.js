import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import AfternoonProjects from './AfternoonProjects/AfternoonProjects';
import MajorProjects from './MajorProjects/MajorProjects';
import { MasterDetail, Master, Detail } from '../Utils/MasterDetail';

import { getProjects } from '../../ducks/projects/actions';
// import Configuration from './Configuration/Configuration';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStudent: {}
    };
  }
  componentDidMount() {
    this.props.getProjects(
      this.props.selectedCohort || this.props.defaultCohort
    );
  }

  render() {
    const renderStudents = student => (
      <React.Fragment key={student.dm_id}>
        <ListItem
          onClick={() => this.setState({ selectedStudent: student })}
          primaryText={`${student.name} (${student.total || 0})`}
          secondaryText={
            <p>
              Oldest Incomplete:
              {student.min
                ? ` ${new Date(student.min).toDateString()}`
                : ' None'}
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider />
      </React.Fragment>
    );
    console.log(this.props);
    const { projects = [] } = this.props;
    const { selectedStudent } = this.state;
    return (
      <MasterDetail>
        <Master list={projects} renderMethod={renderStudents} />
        <Detail
          title={
            <a href={selectedStudent.github_link}>{selectedStudent.name}</a>
          }
        >
          {JSON.stringify(this.state.selectedStudent.projects)}
        </Detail>
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
