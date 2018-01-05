import React, { Component } from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';

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
    console.log('selected: ', this.state.repos.find(c => c.name === selected));
    this.setState({
      selected: this.state.repos.find(c => c.name === selected)
    });
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

export default RepoDropDown;
