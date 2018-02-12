import React from 'react';
import { PropTypes } from 'prop-types';

import { List } from 'material-ui/List';
import { Card, CardText, CardTitle } from 'material-ui/Card';

const MasterDetail = props => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>{props.children}</div>
);
const Master = props => (
  <List
    style={{
      height: 'calc(100vh - 56px)',
      overflowY: 'auto',
      flexBasis: '30%',
      borderRight: '1px solid rgb(224, 224, 224)'
    }}
  >
    {props.children}
    {/*
          Might be able to implement this at some point
          <TextField
            id="filter"
            style={{ margin: '0 auto' }}
            placeholder="Search"
            onChange={e => this.setState({ filter: e.target.value })}
          /> */}
    {props.list.map(props.renderMethod)}
  </List>
);

const Detail = props => (
  <Card zDepth={0} style={{ flexBasis: '70%' }}>
    <CardTitle title={props.title} subtitle={props.subtitle} />
    <CardText>{props.children}</CardText>
  </Card>
);

MasterDetail.propTypes = {
  children: PropTypes.node
};
Master.propTypes = {
  list: PropTypes.array,
  renderMethod: PropTypes.func,
  children: PropTypes.node
};
Detail.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.object,
  children: PropTypes.node
};

export { MasterDetail, Master, Detail };
