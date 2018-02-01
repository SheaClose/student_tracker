import React, { Component } from 'react';
import {
  TextField,
  RaisedButton,
  DatePicker,
  RadioButtonGroup,
  RadioButton,
  Dialog,
  FlatButton
} from 'material-ui';

import RatingBar from './RatingBar';

class AddOneOnOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attitude: null,
      skill: null,
      confidence_skill: null,
      confidence_personal: null,
      worried: false,
      date: new Date()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(property, val) {
    this.setState({ [property]: val });
  }

  render() {
    // console.log(this.state);
    return (
      <Dialog
        title={`Add One on One for ${this.props.student.first_name}`}
        open={this.props.open}
        actions={[
          <FlatButton
            label="Cancel"
            primary={false}
            onClick={this.props.toggleDialog}
          />
        ]}
      >
        <div style={{ textAlign: 'center' }}>
          <DatePicker
            formatDate={d => d.toLocaleDateString()}
            defaultDate={new Date()}
            mode="landscape"
            onChange={(e, val) => this.handleUpdate('date', val)}
          />
          <RatingBar
            title="Attitude"
            property="attitude"
            onClick={this.handleUpdate}
          />
          <RatingBar
            title="Skill"
            property="skill"
            onClick={this.handleUpdate}
          />
          <RatingBar
            title="Confidence (skill)"
            property="confidence_skill"
            onClick={this.handleUpdate}
          />
          <RatingBar
            title="Confidence (personal)"
            property="confidence_personal"
            onClick={this.handleUpdate}
          />
          Worried?
          <RadioButtonGroup
            name="worried"
            onChange={(e, val) => this.handleUpdate('worried', val)}
          >
            <RadioButton value={true} label="Yes" />
            <RadioButton value={false} label="No" />
          </RadioButtonGroup>
          <TextField
            hintText="Add notes"
            multiLine={true}
            rows={4}
            rowsMax={4}
            onChange={(e, newValue) => this.handleUpdate('notes', newValue)}
            value={this.state.notes}
          />
        </div>
      </Dialog>
    );
  }
}

export default AddOneOnOne;
