import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { updateCompletion } from '../../ducks/projects/actions';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { newCompletion: this.props.project.completion };
    this.handleChange = this.handleChange.bind(this);
    this.updateCompletion = this.updateCompletion.bind(this);
  }
  handleChange(event, index, value) {
    this.setState({ newCompletion: value });
  }
  updateCompletion() {
    this.props.updateCompletion(
      this.props.project.id,
      this.state.newCompletion,
      this.props.cohort_id
    );
  }
  render() {
    const { style, project } = this.props;

    return (
      <div
        style={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h3>{project.name}</h3>
        <p>{new Date(project.due_date).toDateString()}</p>
        <DropDownMenu
          value={this.state.newCompletion || project.completion}
          onChange={this.handleChange}
        >
          <MenuItem value={null} primaryText="Not Graded" />
          <MenuItem
            value="incomplete"
            primaryText="Incomplete"
            onChange={this.handleChange}
          />
          <MenuItem
            value="redo"
            primaryText="Redo"
            onChange={this.handleChange}
          />
          <MenuItem
            value="complete"
            primaryText="Complete"
            onChange={this.handleChange}
          />
        </DropDownMenu>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            visibility:
              this.state.newCompletion === project.completion
                ? 'hidden'
                : 'visible'
          }}
        >
          <NavigationClose
            onClick={() => this.setState({ newCompletion: null })}
          />

          <NavigationCheck onClick={this.updateCompletion} />
        </div>
        {/* {this.state.newCompletion !== project.completion && 'test'} */}
      </div>
    );
  }
}

ProjectDetail.propTypes = {
  updateCompletion: PropTypes.func,
  project: PropTypes.object,
  style: PropTypes.object,
  cohort_id: PropTypes.string
};

export default connect(null, { updateCompletion })(ProjectDetail);
