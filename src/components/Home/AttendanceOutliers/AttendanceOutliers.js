import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import List, { ListItem } from 'material-ui/List';
import Card, { CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Rating from '../../Utils/Rating';
/* TODO: This is expecting an array of students with
absence and tardy properties. It might make more sense
to do it some other way */
const AttendanceOutliers = props => {
  const { outliers = { attendance: [] } } = props;
  const { attendance } = outliers;

  return (
    <Card style={props.style}>
      <CardTitle>Attendance</CardTitle>
      <CardText>
        <List>
          {attendance.map(student => (
            <Fragment key={student.dm_id}>
              <ListItem>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <p>{student.name}</p>
                    <p>
                      {student.absences.map(
                        (absence, i, arr) =>
                          new Date(absence.date).toDateString() +
                          (i < arr.length - 1 ? ', ' : '')
                      )}
                    </p>
                  </div>
                  <Rating title="Tardies" value={student.tardies.length} />
                  <Rating
                    title="Total Minutes"
                    value={student.tardies.reduce(
                      (acc, tardy) => +acc + +tardy.minutes,
                      0
                    )}
                  />
                  <Rating title="Absences" value={student.absences.length} />
                </div>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </CardText>
    </Card>
  );
};

AttendanceOutliers.propTypes = {
  outliers: PropTypes.object,
  style: PropTypes.object
};

const mapStateToProps = ({ mainReducer }) => ({
  outliers: mainReducer.outliers
});

export default connect(mapStateToProps)(AttendanceOutliers);
