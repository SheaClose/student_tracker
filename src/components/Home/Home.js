import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

/**
 * I have a feeling we're going to want to go ahead and frontload the outliers,
 * so this could probably go in the App.js with getUserInfo and getStudents. Since
 * the  info will be front loaded, we won't need to bring in the actions (we might need)
 * a loader while that information is fetched though.
 */
import { getUserInfo, getStudents, getOutliers } from '../../ducks/actions';

/** Go ahead and comment this out, if not in use, so we can keep the console clean */
import Overview from './Overview/Overview';

/** Probably won't need axios in components since we're using async redux. */
import axios from 'axios';
import './Home.css';

class Home extends Component {
  /** outliers can go in the store, so this constructor will likely be unnecessary. */
  constructor(props) {
    super(props);
    this.state = {
      outliers: {}
    };
  }

  /** redux...  */
  componentDidMount() {
    // get this into redux obvi
    axios
      .get('/api/outliers/')
      .then(response => this.setState({ outliers: response.data }));
  }
  render() {
    /** Please always clear console.log's before pushing your code. The only exception is
     * when you're confirming some action after it's taken for dev purposes. Just don't have
     * them in something like 'render'
     */
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
  /** redux store has userinfo intially set to array, you're expecting an object? */
  userInfo: PropTypes.object,
  getUserInfo: PropTypes.func
};

export default connect(
  /** Go ahead and break this out to a seperate mapStateToProps function for clarity. */
  state => ({ userInfo: state.userInfo, students: state.students }),
  {
    getUserInfo,
    getStudents
  }
)(Home);
