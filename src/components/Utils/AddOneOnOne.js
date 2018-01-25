import React, { Component } from 'react';
import {
  TextField,
  RaisedButton,
  DatePicker,
  RadioButtonGroup,
  RadioButton
} from 'material-ui';

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
        <RatingBar title="Attitude" handleClick={() => null} />
        <RatingBar title="Skill" handleClick={() => null} />
        <RatingBar title="Confidence (skill)" handleClick={() => null} />
        <RatingBar title="Confidence (personal)" handleClick={() => null} />
        Worried?
        <RadioButtonGroup name="worried">
          <RadioButton value={true} label="Yes" />
          <RadioButton value={false} label="No" />
        </RadioButtonGroup>
        <TextField hintText="Add notes" multiLine={true} />
        <RaisedButton label="Submit" />
      </div>
    );
  }
}

export default AddOneOnOne;
