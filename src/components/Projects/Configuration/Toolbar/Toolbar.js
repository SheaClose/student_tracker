import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { PropTypes } from 'prop-types';

export class ConfigToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 3,
      selectedCohortName: 'WDL10',
      selectedCohortValue: '',
      cohorts: [
        {
          name: 'WDL11',
          id: 335
        },
        {
          name: 'WDL10',
          id: 221
        },
        {
          name: 'PHXDL03',
          id: 331
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    console.log(value);
    this.setState({ selectedCohortName: value });
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.selectedCohortName} onChange={this.handleChange}>
            {this.state.cohorts.map((x, i) => <MenuItem key={x.id} primaryText={x.name} value={x.name} />)}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton onClick={this.props.addProject} label="Add Project" primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

ConfigToolbar.propTypes = {
  addProject: PropTypes.func
};
