import React, { Component } from 'react';
import { connect } from 'react-redux';

// import AttendanceOutliers from './AttendanceOutliers/AttendanceOutliers';
import ProjectOutliers from './ProjectOutliers/ProjectOutliers';
import OneOnOneOutliers from './OneOnOneOutliers/OneOnOneOutliers';

class Home extends Component {
  render() {
    return (
      <div>
        {/* AttendanceOutliers is really, really broken
        <AttendanceOutliers style={{ margin: '25px' }} /> */}
        <ProjectOutliers style={{ margin: '25px' }} />
        <OneOnOneOutliers style={{ margin: '25px' }} />
      </div>
    );
  }
}

const mapStateToProps = ({ mainReducer }) => {
  const { userInfo, students, outliers } = mainReducer;
  return {
    userInfo,
    students,
    outliers
  };
};

export default connect(mapStateToProps)(Home);
