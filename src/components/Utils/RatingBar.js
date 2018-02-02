import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from 'material-ui';

import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import SentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import SentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';

class RatingBar extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(property, selected) {
    this.setState({ selected });
    this.props.onClick(property, selected);
  }

  render() {
    const { property } = this.props;
    const { selected } = this.state;
    return (
      <div>
        <IconButton onClick={() => this.handleClick(property, 1)}>
          <SentimentVeryDissatisfied color={selected === 1 ? 'blue' : ''} />
        </IconButton>
        <IconButton onClick={() => this.handleClick(property, 2)}>
          <SentimentDissatisfied color={selected === 2 ? 'blue' : ''} />
        </IconButton>
        <IconButton onClick={() => this.handleClick(property, 3)}>
          <SentimentNeutral color={selected === 3 ? 'blue' : ''} />
        </IconButton>
        <IconButton onClick={() => this.handleClick(property, 4)}>
          <SentimentSatisfied color={selected === 4 ? 'blue' : ''} />
        </IconButton>
        <IconButton onClick={() => this.handleClick(property, 5)}>
          <SentimentVerySatisfied color={selected === 5 ? 'blue' : ''} />
        </IconButton>
      </div>
    );
  }
}
RatingBar.propTypes = {
  onClick: PropTypes.func,
  property: PropTypes.string
};

export default RatingBar;
