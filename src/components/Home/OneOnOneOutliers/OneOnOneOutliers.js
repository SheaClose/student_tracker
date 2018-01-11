import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const OneOnOneOutliers = props => {
  const { outliers = { oneonones: [] } } = props;
  const { oneonones } = outliers;
  return (
    <Table>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={{ textAlign: 'center' }}>
            One-on-Ones
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>Student</TableHeaderColumn>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Skill</TableHeaderColumn>
          <TableHeaderColumn>Confidence (Skill)</TableHeaderColumn>
          <TableHeaderColumn>Confidence (Personal)</TableHeaderColumn>
          <TableHeaderColumn>Attitude</TableHeaderColumn>
          <TableHeaderColumn>Worried</TableHeaderColumn>
          <TableHeaderColumn>Drop Concern</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {oneonones.map(student => (
          <TableRow key={student.name}>
            <TableRowColumn>{student.name}</TableRowColumn>
            {student.oneonones.map(
              ({
                date,
                skill,
                confidence_skill,
                confidence_personal,
                attitude,
                defer_drop_concern,
                worried
              }) => (
                <Fragment key={student.name}>
                  <TableRowColumn>
                    {new Date(date).toDateString()}
                  </TableRowColumn>
                  <TableRowColumn>{skill}</TableRowColumn>
                  <TableRowColumn>{confidence_skill}</TableRowColumn>
                  <TableRowColumn>{confidence_personal}</TableRowColumn>
                  <TableRowColumn>{attitude}</TableRowColumn>
                  <TableRowColumn>
                    {JSON.stringify(defer_drop_concern)}
                  </TableRowColumn>
                  <TableRowColumn>{JSON.stringify(worried)}</TableRowColumn>
                </Fragment>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

OneOnOneOutliers.propTypes = {
  outliers: PropTypes.object
};

const mapStateToProps = ({ mainReducer }) => ({
  outliers: mainReducer.outliers
});

export default connect(mapStateToProps)(OneOnOneOutliers);
