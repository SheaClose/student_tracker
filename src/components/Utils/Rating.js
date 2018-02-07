import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, title, fontSize = '24px' }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '5px'
    }}
  >
    <span style={{ fontSize, paddingBottom: '5px' }}>{value}</span>
    <p>{title}</p>
  </div>
);
Rating.propTypes = {
  value: PropTypes.number,
  title: PropTypes.string,
  fontSize: PropTypes.string
};
export default Rating;
