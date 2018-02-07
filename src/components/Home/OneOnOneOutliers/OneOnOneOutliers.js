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
import Card, { CardTitle, CardText } from 'material-ui/Card';
import List from 'material-ui/List';

import OneOnOneDetail from '../../OneOnOnes/OneOnOneDetail';

const OneOnOneOutliers = props => {
  const { outliers = { oneonones: [] } } = props;
  const { oneonones } = outliers;
  console.log(oneonones);
  return (
    <Card style={props.style}>
      <CardTitle>One-on-Ones</CardTitle>
      <CardText>
        {oneonones.map(student =>
          student.oneonones.map(detail => (
            <List>
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
  outliers: PropTypes.object
};

const mapStateToProps = ({ mainReducer }) => ({
  outliers: mainReducer.outliers
});

export default connect(mapStateToProps)(OneOnOneOutliers);
