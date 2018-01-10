import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import './Student.css';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: this.props.students
        .map(c => c.classSession)
        .reduce((a, c) => [...a, ...c], [])
        .find(c => c.dmId === Number(this.props.match.params.id))
    };
  }

  render() {
    const { student } = this.state;
    return (
      <div className="">
        <ul>
          <li>{student.first_name}</li>
          <li>{student.last_name}</li>
          <li>{student.email}</li>
          <li>{student.status}</li>
        </ul>
      </div>
    );
  }
}

Student.propTypes = {
  students: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps({ mainReducer }) {
  return { students: mainReducer.students };
}

export default connect(mapStateToProps)(Student);
