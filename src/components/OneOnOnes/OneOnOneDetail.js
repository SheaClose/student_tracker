import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Utils/Rating';

const OneOnOneDetail = ({ detail }) => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap'
    },
    notes: {
      margin: '25px'
    }
  };
  return detail.date ? (
    <div>
      <p>{new Date(detail.date).toDateString()}</p>
      <div style={styles.container}>
        <Rating value={detail.attitude} title="Attitude" />
        <Rating value={detail.skill} title="Skill" />
        <Rating value={detail.confidence_skill} title="Confidence (skill)" />
        <Rating
          value={detail.confidence_personal}
          title="Confidence (personal)"
        />
      </div>
      <div style={styles.notes}>{detail.notes}</div>
    </div>
  ) : (
    <div style={styles.notes}>No one on ones yet.</div>
  );
};

OneOnOneDetail.propTypes = {
  detail: PropTypes.object
};

export default OneOnOneDetail;
