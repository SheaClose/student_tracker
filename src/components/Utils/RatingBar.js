import React from 'react';
import PropTypes from 'prop-types';

import { IconButton } from 'material-ui';

import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import SentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import SentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';

const RatingBar = props => (
  <div>
    <IconButton onClick={() => props.onClick(props.property, 1)}>
      <SentimentVeryDissatisfied />
    </IconButton>
    <IconButton onClick={() => props.onClick(props.property, 2)}>
      <SentimentDissatisfied />
    </IconButton>
    <IconButton onClick={() => props.onClick(props.property, 3)}>
      <SentimentNeutral />
    </IconButton>
    <IconButton onClick={() => props.onClick(props.property, 4)}>
      <SentimentSatisfied />
    </IconButton>
    <IconButton onClick={() => props.onClick(props.property, 5)}>
      <SentimentVerySatisfied />
    </IconButton>
  </div>
);

RatingBar.propTypes = {
  onClick: PropTypes.func,
  property: PropTypes.string
};

export default RatingBar;
