import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Card, { CardTitle, CardText } from 'material-ui/Card';
import List from 'material-ui/List';

import OneOnOneDetail from '../../OneOnOnes/OneOnOneDetail';

const OneOnOneOutliers = props => {
  const { outliers = { oneonones: [] } } = props;
  const { oneonones } = outliers;

  return (
    <Card style={props.style}>
      <CardTitle>One-on-Ones</CardTitle>
      <CardText>
        {oneonones.map(student =>
          student.oneonones.map(detail => (
            <List key={detail.id}>
              <p>{detail.first_name}</p>
              <OneOnOneDetail detail={detail} />
            </List>
          ))
        )}
      </CardText>
    </Card>
  );
};

OneOnOneOutliers.propTypes = {
  outliers: PropTypes.object,
  style: PropTypes.object
};

const mapStateToProps = ({ mainReducer }) => ({
  outliers: mainReducer.outliers
});

export default connect(mapStateToProps)(OneOnOneOutliers);
