import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Home.css';
import AttendanceOutliers from './AttendanceOutliers/AttendanceOutliers';
import ProjectOutliers from './ProjectOutliers/ProjectOutliers';

class Home extends Component {
  render() {
    return (
      <div>
        <img
          alt="unicorn"
          src="https://78.media.tumblr.com/6379b40e4a36490c58cae94a474babce/tumblr_o2idih49Md1u69veko1_500.gif"
          style={{ width: '25px', height: 'auto' }}
        />
        <AttendanceOutliers />
        <ProjectOutliers />
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
