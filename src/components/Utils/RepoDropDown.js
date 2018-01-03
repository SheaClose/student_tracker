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
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
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

  handleUpdateInput(value) {
    this.setState({
      dataSource: this.state.repos
        .map(c => c.name)
        .filter(c => c.toLowerCase().includes(value.toLowerCase()))
    });
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
        hintText="Type anything"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleSelect}
        maxSearchResults={5}
      />
    );
  }
}

export default RepoDropDown;
