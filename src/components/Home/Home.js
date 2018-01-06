import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getUserInfo, getStudents, getOutliers } from '../../ducks/actions';
import Overview from './Overview/Overview';
import axios from 'axios';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outliers: {}
    };
  }
  componentDidMount() {
    // get this into redux obvi
    axios
      .get('/api/outliers/')
      .then(response => this.setState({ outliers: response.data }));
  }
  render() {
    console.log(this.state.outliers);
    return (
      <div>
        <img
          alt="unicorn"
          src="https://78.media.tumblr.com/6379b40e4a36490c58cae94a474babce/tumblr_o2idih49Md1u69veko1_500.gif"
          style={{ width: '25px', height: 'auto' }}
        />

        {/* this.state.outliers.absences && (
          <Overview outliers={this.state.outliers} />
        ) */}
        {JSON.stringify(this.state.outliers)}
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
