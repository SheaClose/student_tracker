import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getStudents } from '../../ducks/actions';
// import './Students.css';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getStudents();
  }

  render() {
    console.log('props: ', this.props.students);
    return <div className="">Students</div>;
  }
}

Students.propTypes = {
  getStudents: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired
};

export default connect(state => state, { getStudents })(Students);
