import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import { getAttendance } from '../../ducks/actions';

import { MasterDetail, Master, Detail } from '../Utils/MasterDetail';

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
      selected: {}
    };
  }

  componentDidMount() {
    this.props.getAttendance(
      this.props.selectedCohort || this.props.defaultCohort
    );
  }

  render() {
    const { selected } = this.state;
    const renderStudents = student => (
      <React.Fragment key={student.dm_id || student.cohort_id}>
        <ListItem
          onClick={() => this.setState({ selected: student })}
          primaryText={student.name}
          secondaryText={
            <p>
              {/* student.attendance */}
              incomplete project
            </p>
          }
        />
        <Divider />
      </React.Fragment>
    );

    return (
      <MasterDetail>
        <Master list={this.state.attendance} renderMethod={renderStudents}>
          <ListItem
            onClick={() => this.setState({ selected: { name: 'WDL10' } })}
            primaryText={'WDL10'}
            secondaryText="Overview"
          />
          <Divider />
        </Master>
        <Detail title={selected.name}>
          {this.state.attendance.map(student => (
            <div
              key={student.dm_id}
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <div style={{ width: '30%' }}>{student.name}</div>
              {student.attendance.map(stamp => (
                <div key={stamp.id} style={{ width: '30%' }}>
                  {stamp.timeframe + stamp.minutes}
                </div>
              ))}
            </div>
          ))}
        </Detail>
      </MasterDetail>
    );
  }
}

const mapStateToProps = ({ mainReducer }) => {
  const { selectedCohort, defaultCohort } = mainReducer;
  return {
    selectedCohort,
    defaultCohort
  };
};

export default connect(mapStateToProps, { getAttendance })(Attendance);
