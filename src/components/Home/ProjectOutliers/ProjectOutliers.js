import React from 'react';
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

const ProjectOutliers = props => {
  const { outliers = { attendance: [], projects: [] } } = props;
  const { projects } = outliers;
  return (
    <Table>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn colSpan="3" style={{ textAlign: 'center' }}>
            Projects
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>Student</TableHeaderColumn>
          <TableHeaderColumn>projects</TableHeaderColumn>
          <TableHeaderColumn>projects</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {projects.map(student => (
          <TableRow key={student.name}>
            <TableRowColumn>{student.name}</TableRowColumn>
            <TableRowColumn>
              <div>{student.projects.length} </div>
            </TableRowColumn>
            <TableRowColumn>
              {student.projects.map(project => (
                <div key={project.name}>
                  {`${project.name} (${new Date(
                    project.due_date
                  ).toDateString()}) - ${project.status}`}
                </div>
              ))}
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

ProjectOutliers.propTypes = {
  outliers: PropTypes.object
};

const mapStateToProps = ({ mainReducer }) => ({
  outliers: mainReducer.outliers
});

export default connect(mapStateToProps)(ProjectOutliers);
