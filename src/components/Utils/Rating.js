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
    <p>{title}</p>
  </div>
);
Rating.propTypes = {
  value: PropTypes.number,
  title: PropTypes.string
};
export default Rating;
