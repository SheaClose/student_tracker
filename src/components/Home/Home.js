import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home-styling">
        <img
          alt="unicorn"
          src="https://78.media.tumblr.com/6379b40e4a36490c58cae94a474babce/tumblr_o2idih49Md1u69veko1_500.gif"
        />
      </div>
    );
  }
}
export default Home;
