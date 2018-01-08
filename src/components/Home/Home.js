import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

/** Go ahead and comment this out, if not in use, so we can keep the console clean */
// import Overview from './Overview/Overview';

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

        {/* this.state.outliers.absences && (
          <Overview outliers={this.state.outliers} />
        ) */}
        {JSON.stringify(this.props.outliers)}
      </div>
    );
  }
}

Home.propTypes = {
  outliers: PropTypes.object
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  students: state.students,
  outliers: state.outliers
});

export default connect(mapStateToProps)(Home);
