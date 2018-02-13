import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Card, { CardTitle, CardText } from 'material-ui/Card';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider/Divider';
import Rating from '../../Utils/Rating';

const ProjectOutliers = props => {
  const { outliers = { attendance: [], projects: [] } } = props;
  const { projects } = outliers;

  return (
    <Card style={props.style}>
      <CardTitle>Projects</CardTitle>
      <CardText>
        <List>
          {projects.map(student => (
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
                  </div>
                  <Rating title="Incomplete" value={student.projects.length} />
                  <div>
                    {student.projects.map(
                      (project, i) =>
                        (i < 3 ? (
                          <p key={project.name}>
                            {project.name} ({new Date(
                              project.due_date
                            ).toDateString()})
                          </p>
                        ) : null)
                    )}
                  </div>
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

ProjectOutliers.propTypes = {
  outliers: PropTypes.object,
  style: PropTypes.object
};

const mapStateToProps = ({ mainReducer }) => ({
  outliers: mainReducer.outliers
});

export default connect(mapStateToProps)(ProjectOutliers);
