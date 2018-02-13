import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Home.css';
import AttendanceOutliers from './AttendanceOutliers/AttendanceOutliers';
import ProjectOutliers from './ProjectOutliers/ProjectOutliers';
import OneOnOneOutliers from './OneOnOneOutliers/OneOnOneOutliers';

class Home extends Component {
  render() {
    return (
      <div>
        <AttendanceOutliers style={{ margin: '25px' }} />
        <ProjectOutliers style={{ margin: '25px' }} />
        <OneOnOneOutliers style={{ margin: '25px' }} />
      </div>
    );
  }
}

const mapStateToProps = ({ mainReducer }) => ({
  userInfo: mainReducer.userInfo,
  students: mainReducer.students,
  outliers: mainReducer.outliers
});

export default connect(mapStateToProps)(Home);
