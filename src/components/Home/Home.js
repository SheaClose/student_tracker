import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getUserInfo, getStudents } from '../../ducks/actions';
import Overview from './Overview/Overview';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <img
          alt="unicorn"
          src="https://78.media.tumblr.com/6379b40e4a36490c58cae94a474babce/tumblr_o2idih49Md1u69veko1_500.gif"
          style={{ width: '25px', height: 'auto' }}
        />

        {this.props.students[0] && (
          <Overview students={this.props.students[0].classSession} />
        )}
      </div>
    );
  }
}

Home.propTypes = {
  userInfo: PropTypes.object,
  getUserInfo: PropTypes.func
};

export default connect(
  state => ({ userInfo: state.userInfo, students: state.students }),
  {
    getUserInfo,
    getStudents
  }
)(Home);
