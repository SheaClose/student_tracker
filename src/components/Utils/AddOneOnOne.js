import React, { Component } from 'react';
import { TextField, RaisedButton, DatePicker } from 'material-ui';

import RatingBar from './RatingBar';

class AddOneOnOne extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <DatePicker
          formatDate={d => d.toLocaleDateString()}
          defaultDate={new Date()}
          mode="landscape"
        />
        <RatingBar handleClick={() => null} />
        <div>
          <TextField hintText="Add notes" multiLine={true} />
        </div>
        <RaisedButton label="Submit" />
      </div>
    );
  }
}

export default AddOneOnOne;
