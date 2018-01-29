import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Dialog from 'material-ui/Dialog';
import AddOneOnOne from '../Utils/AddOneOnOne';
import FlatButton from 'material-ui/FlatButton';
import SelectCohort from '../Utils/SelectCohort';

const actions = [<FlatButton label="Cancel" primary={true} />];

class OneOnOnes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const students =
      this.props.students.filter(
        session => session.name === this.props.defaultCohort
      )[0] || [{ classSession: [] }][0];
    return (
      <div>
        {students.classSession.map(student => (
          <div key={student.dmId}>{student.first_name}</div>
        ))}
        <button
          onClick={() => this.setState(oldState => ({ open: !oldState.open }))}
        >
          Toggle
        </button>
        <SelectCohort />
        <Dialog title="Add One on One" open={this.state.open} actions={actions}>
          <AddOneOnOne />
        </Dialog>
      </div>
    );
  }
}

OneOnOnes.propTypes = {
  students: PropTypes.array
};

const mapStateToProps = ({ mainReducer }) => ({
  students: mainReducer.students,
  defaultCohort: mainReducer.defaultCohort
});

export default connect(mapStateToProps)(OneOnOnes);
