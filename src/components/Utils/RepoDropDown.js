import React, { Component } from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import { PropTypes } from 'prop-types';

class RepoDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      repos: []
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    axios
      .get('/api/repos')
      .then(res => {
        this.setState({
          repos: res.data,
          dataSource: res.data.map(c => c.name),
          selected: {}
        });
      })
      .catch(console.log);
  }

  handleSelect(selected) {
    this.setState(
      {
        selected: this.state.repos.find(c => c.name === selected)
      },
      () => {
        this.props.selectProject(this.state.selected);
      }
    );
  }

  render() {
    return (
      <AutoComplete
        hintText="Search Project Repos"
        dataSource={this.state.dataSource}
        filter={AutoComplete.caseInsensitiveFilter}
        onNewRequest={this.handleSelect}
        maxSearchResults={5}
      />
    );
  }
}

RepoDropDown.propTypes = {
  selectProject: PropTypes.func
};

export default RepoDropDown;
