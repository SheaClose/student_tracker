import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WeeklyView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: this.props.students
    };
  }
  render() {
    return (
      <div>
        <h1>WeeklyView</h1>
      </div>
    );
  }
}

WeeklyView.propTypes = {
  students: PropTypes.array.isRequired
};
