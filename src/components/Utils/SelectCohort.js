import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { selectCohort } from '../../ducks/actions';

const SelectCohort = props => (
  <DropDownMenu
    value={props.selectedCohort || props.defaultCohort}
    onChange={(e, idx, value) => props.selectCohort(value)}
  >
    {props.cohorts.map(x => (
      <MenuItem key={x.name} primaryText={x.name} value={x.name} />
    ))}
  </DropDownMenu>
);
const mapStateToProps = state => ({
  cohorts: state.mainReducer.students,
  selectedCohort: state.mainReducer.selectedCohort,
  defaultCohort: state.mainReducer.defaultCohort
});

SelectCohort.propTypes = {
  selectedCohort: PropTypes.string,
  defaultCohort: PropTypes.string,
  selectCohort: PropTypes.func,
  cohorts: PropTypes.array
};

export default connect(mapStateToProps, { selectCohort })(SelectCohort);
