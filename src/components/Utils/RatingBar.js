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
    <IconButton onClick={props.handleClick}>
      <SentimentVeryDissatisfied />
    </IconButton>
    <IconButton onClick={props.handleClick}>
      <SentimentDissatisfied />
    </IconButton>
    <IconButton onClick={props.handleClick}>
      <SentimentNeutral />
    </IconButton>
    <IconButton onClick={props.handleClick}>
      <SentimentSatisfied />
    </IconButton>
    <IconButton onClick={props.handleClick}>
      <SentimentVerySatisfied />
    </IconButton>
  </div>
);

RatingBar.propTypes = {
  handleClick: PropTypes.func
};

export default RatingBar;
