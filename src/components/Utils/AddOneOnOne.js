import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  TextField,
  DatePicker,
  RadioButtonGroup,
  RadioButton,
  FlatButton
} from 'material-ui';

import { addOneOnOne } from '../../ducks/actions';
import RatingBar from './RatingBar';

class AddOneOnOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attitude: null,
      skill: null,
      confidence_skill: null,
      confidence_personal: null,
      defer_drop_concern: null,
      worried: false,
      notes: '',
      personal_project_ability: null,
      group_project_ability: null,
      mentor_id: null,
      date: new Date()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addOneOnOne = this.addOneOnOne.bind(this);
  }

  handleUpdate(property, val) {
    this.setState({ [property]: val });
  }
  addOneOnOne() {
    const newOneOnOne = {
      ...this.state,
      first_name: this.props.student.first_name,
      last_name: this.props.student.last_name,
      dm_id: this.props.student.dm_id,
      mentor_id: this.props.userInfo.id,
      cohort: this.props.cohort
    };
    this.props.addOneOnOne(newOneOnOne);
    this.props.hideAdd(newOneOnOne);
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      },
      rating: {
        minWidth: '75%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    };
    return (
      <div>
        <div style={styles.container}>
          <DatePicker
            id="date"
            formatDate={d => d.toLocaleDateString()}
            defaultDate={new Date()}
            mode="landscape"
            onChange={(e, val) => this.handleUpdate('date', val)}
          />
          <div style={styles.rating}>
            <p>Attitude</p>
            <RatingBar
              title="Attitude"
              property="attitude"
              onClick={this.handleUpdate}
            />
          </div>
          <div style={styles.rating}>
            <p>Skill</p>
            <RatingBar
              title="Skill"
              property="skill"
              onClick={this.handleUpdate}
            />
          </div>
          <div style={styles.rating}>
            <p>Confidence (skill)</p>
            <RatingBar
              title="Confidence (skill)"
              property="confidence_skill"
              onClick={this.handleUpdate}
            />
          </div>
          <div style={styles.rating}>
            <p>Confidence (personal)</p>
            <RatingBar
              title="Confidence (personal)"
              property="confidence_personal"
              onClick={this.handleUpdate}
            />
          </div>
          <div style={styles.rating}>
            <p>Worried?</p>
            <RadioButtonGroup
              name="worried"
              onChange={(e, val) => this.handleUpdate('worried', val)}
              style={{ display: 'flex', flexDirection: 'row', padding: '5px' }}
            >
              <RadioButton value={true} label="Yes " />
              <RadioButton value={false} label="No " />
            </RadioButtonGroup>
          </div>
          <TextField
            floatingLabelText="Add notes"
            multiLine={true}
            rows={4}
            rowsMax={4}
            onChange={(e, newValue) => this.handleUpdate('notes', newValue)}
            value={this.state.notes}
            style={{ minWidth: '75%' }}
          />
          <div>
            <FlatButton
              label="Cancel"
              onClick={() => this.props.hideAdd(this.props.student)}
            />
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.addOneOnOne}
            />
          </div>
        </div>
      </div>
    );
  }
}

AddOneOnOne.propTypes = {
  student: PropTypes.object,
  addOneOnOne: PropTypes.func,
  hideAdd: PropTypes.func,
  userInfo: PropTypes.object,
  cohort: PropTypes.string
};

const mapStateToProps = ({ mainReducer }) => {
  const { userInfo } = mainReducer;
  return { userInfo };
};

export default connect(mapStateToProps, { addOneOnOne })(AddOneOnOne);
