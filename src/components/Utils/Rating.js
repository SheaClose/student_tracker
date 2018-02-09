import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, title, style }) => (
  <div
    style={{
      ...style,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '5px'
    }}
  >
    <h3>{value}</h3>
    {title}
  </div>
);
Rating.propTypes = {
  value: PropTypes.node,
  title: PropTypes.node,
  style: PropTypes.object
};
export default Rating;
