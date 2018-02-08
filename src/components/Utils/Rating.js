import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, title }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '25px'
    }}
  >
    <h1>{value}</h1>
    {title}
  </div>
);
Rating.propTypes = {
  value: PropTypes.string,
  title: PropTypes.node
};
export default Rating;
