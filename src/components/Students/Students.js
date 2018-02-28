import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import Card, { CardTitle, CardText } from 'material-ui/Card';
import {
  getStudents,
  getStudentDetails,
  selectCohort
} from '../../ducks/actions';
import './Students.css';
import { MasterDetail, Master } from '../Utils/MasterDetail';
import ProjectDetail from '../Projects/ProjectDetail';

class Students extends Component {
  componentDidMount() {
    const { cohort_id, dm_id } = this.props.match.params;

    if (dm_id) {
      this.props.getStudentDetails(dm_id);
    }
    if (cohort_id) {
      this.props.getStudents(cohort_id);
      this.props.selectCohort(cohort_id, 'componentDidMount - Students');
    } else {
      const cohort = this.props.selectedCohort || this.props.defaultCohort;

      if (cohort) {
        this.props.getStudents(cohort);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    /* Trying to figure out how to make sure the path
    and the selected cohort stay in sync. This code
    makes an infinite loop of changing the selectedCohort
    back and forth...  */
    // if (this.props.match.params.cohort_id && nextProps.selectedCohort) {
    //   if (this.props.match.params.cohort_id !== nextProps.selectedCohort) {
    //     this.props.history.push(
    //       `/students/${nextProps.match.params.cohort_id}/${nextProps.match
    //         .params.dm_id || ''}`
    //     );
    //   }
    // }
    //   if (
    //     nextProps.match.params.cohort_id !==
    //     (nextProps.selectedCohort || nextProps.defaultCohort)
    //   ) {
    //     console.log(nextProps);
    //     this.props.selectCohort(
    //       nextProps.match.params.cohort_id,
    //       'receiveporps'
    //     );
    //     this.props.getStudents(nextProps.match.params.cohort_id);
    //   }
    // }
    // if (nextProps.match.params.dm_id !== nextProps.selectedStudent) {
    //   this.props.getStudentDetails(nextProps.match.params.dm_id);
    // }
    const nextCohort = nextProps.match.params.cohort_id;
    const nextStudent = nextProps.match.params.dm_id;

    if (nextCohort && nextStudent) {
      if (nextStudent !== this.props.match.params.dm_id) {
        this.props.getStudentDetails(nextProps.match.params.dm_id);
      }
    }

    if (nextProps.selectedCohort !== this.props.selectedCohort) {
      console.log('selectedcohort changed', nextProps.selectedCohort);
      this.props.history.push(`/students/${nextProps.selectedCohort}`);
      // console.log('selected', nextProps.selectedCohort);
      this.props.getStudents(nextProps.selectedCohort);
    } else if (nextProps.defaultCohort !== this.props.defaultCohort) {
      // console.log('default', nextProps.defaultCohort);
      this.props.getStudents(nextProps.defaultCohort);
    }
  }

  render() {
    const { students } = this.props;
    const { category, cohort_id, dm_id } = this.props.match.params;
    // console.log('students', students);
    // const selectedStudent =
    //   students.find(student => student.dm_id === +dm_id) || {};
    const { studentDetails = {} } = this.props;
    const selectedStudent = studentDetails;
    const { projects = [] } = studentDetails;
    console.log(studentDetails);

    const renderStudents = student => (
      <React.Fragment key={student.dm_id}>
        <ListItem
          onClick={() =>
            this.props.history.push(
              `/students/${student.cohort_id}/${student.dm_id}`
            )
          }
          primaryText={`${student.first_name} ${student.last_name}`}
          secondaryText={
            <div>
              <p>{student.email}</p>
              <p>{student.status}</p>
            </div>
          }
          secondaryTextLines={2}
        />
        <Divider />
      </React.Fragment>
    );
    // console.log(this.props);
    return (
      <MasterDetail>
        <Master list={students} renderMethod={renderStudents} />
        <div style={{ flexBasis: '70%', flexGrow: '1' }}>
          <Tabs
            value={category || 'info'}
            onChange={tab =>
              this.props.history.push(`/students/${cohort_id}/${dm_id}/${tab}`)
            }
          >
            <Tab style={{ background: '#AAA' }} label="Info" value="info">
              <Card zDepth={0}>
                <CardTitle
                  title={`${selectedStudent.first_name} ${
                    selectedStudent.last_name
                  }`}
                  subtitle={
                    <div>
                      <a href={selectedStudent.linkedin_link}>LinkedIn</a>,{' '}
                      <a href={selectedStudent.github_link}>Github</a>
                    </div>
                  }
                />
              </Card>
            </Tab>
            <Tab
              style={{ background: '#AAA' }}
              label="One-on-Ones"
              value="oneonones"
            >
              <Route
                path="/students/:cohort_id/:id"
                render={() => (
                  <Card zDepth={0}>
                    <CardTitle>{selectedStudent.first_name}</CardTitle>
                  </Card>
                )}
              />
              <Route exact path="/students" render={() => 'Select a student'} />
            </Tab>
            <Tab
              value="projects"
              style={{ background: '#AAA' }}
              label="Projects"
            >
              <Card zDepth={0}>
                <CardTitle>{selectedStudent.first_name}</CardTitle>
                <CardText>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      flexWrap: 'wrap'
                    }}
                  >
                    {projects.map(project => (
                      <ProjectDetail
                        key={project.id}
                        style={{ width: '24%' }}
                        project={project}
                        cohort_id={selectedStudent.cohort_id}
                      />
                    ))}
                  </div>
                </CardText>
              </Card>
            </Tab>
            <Tab
              value="attendance"
              style={{ background: '#AAA' }}
              label="Attendance"
            >
              test
            </Tab>
          </Tabs>
        </div>
      </MasterDetail>
    );
  }
}

Students.propTypes = {
  students: PropTypes.array,
  defaultCohort: PropTypes.string,
  selectedCohort: PropTypes.string,
  getStudents: PropTypes.func,
  getStudentDetails: PropTypes.func,
  selectCohort: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object
};

function mapStateToProps({ mainReducer }) {
  return {
    students: mainReducer.students,
    defaultCohort: mainReducer.defaultCohort,
    selectedCohort: mainReducer.selectedCohort,
    studentDetails: mainReducer.studentDetails
  };
}

export default connect(mapStateToProps, {
  getStudents,
  getStudentDetails,
  selectCohort
})(Students);
