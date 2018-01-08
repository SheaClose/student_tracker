import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

export default class MajorProjects extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Major Projects</h1>
      </div>
    );
  }
}
