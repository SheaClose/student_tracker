import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import { MasterDetail, Master, Detail } from '../Utils/MasterDetail';

import axios from 'axios';

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
      selected: {}
    };
  }
  componentDidMount() {
    axios
      .get('/api/attendance/?cohort_id=WDL10')
      .then(result => this.setState({ attendance: result.data }));
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
    console.log(this.state.attendance);
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
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <div style={{ width: '30%' }}>{student.name}</div>
              {student.attendance.map(stamp => (
                <div style={{ width: '30%' }}>
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

export default Attendance;
