import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { MasterDetail, Master, Detail } from '../Utils/MasterDetail';
import { getProjects } from '../../ducks/projects/actions';
import ProjectDetail from './ProjectDetail';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStudent: { projects: [] }
    };
  }
  componentDidMount() {
    this.props.getProjects(
      this.props.selectedCohort || this.props.defaultCohort
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCohort !== this.props.selectedCohort) {
      nextProps.getProjects(nextProps.selectedCohort);
    } else if (nextProps.defaultCohort !== this.props.defaultCohort) {
      nextProps.getProjects(nextProps.defaultCohort);
    }
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
      }
    };
    const renderStudents = student => (
      <React.Fragment key={student.dm_id}>
        <ListItem
          onClick={() => this.setState({ selectedStudent: student })}
          primaryText={student.name}
          secondaryText={
            <p>
              {student.total_incomplete}
              incomplete project
              {student.total_incomplete !== '1' && 's'}
            </p>
          }
        />
        <Divider />
      </React.Fragment>
    );

    const { projects = [] } = this.props;
    const selectedStudent = this.state.selectedStudent.dm_id
      ? this.state.selectedStudent
      : projects[0] || { projects: [] };

    return (
      <MasterDetail>
        <Master list={projects} renderMethod={renderStudents} />
        <Detail title={selectedStudent.name}>
          <div style={styles.container}>
            {selectedStudent.projects.map(project => (
              <ProjectDetail
                key={project.id}
                style={{ width: '24%' }}
                project={project}
              />
            ))}
          </div>
        </Detail>
      </MasterDetail>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.array,
  getProjects: PropTypes.func,
  selectedCohort: PropTypes.string,
  defaultCohort: PropTypes.string
};
const mapStateToProps = ({ projectsReducer, mainReducer }) => {
  const { projects } = projectsReducer;
  const { selectedCohort, defaultCohort } = mainReducer;
  return { projects, selectedCohort, defaultCohort };
};
export default connect(mapStateToProps, { getProjects })(Projects);
