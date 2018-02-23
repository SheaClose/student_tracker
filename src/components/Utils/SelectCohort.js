import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { selectCohort } from '../../ducks/actions';

const SelectCohort = props => (
  <DropDownMenu
    value={props.selectedCohort || props.defaultCohort}
    onChange={(e, idx, value) => {
      props.selectCohort(value);
    }}
  >
    {props.cohorts.map(cohort => (
      <MenuItem key={cohort} primaryText={cohort} value={cohort} />
    ))}
  </DropDownMenu>
);
const mapStateToProps = state => {
  const { userInfo, selectedCohort, defaultCohort } = state.mainReducer;
  return {
    cohorts: userInfo.cohorts || [],
    selectedCohort,
    defaultCohort
  };
};

SelectCohort.propTypes = {
  selectedCohort: PropTypes.string,
  defaultCohort: PropTypes.string,
  selectCohort: PropTypes.func,
  cohorts: PropTypes.array
};

export default connect(mapStateToProps, { selectCohort })(SelectCohort);
