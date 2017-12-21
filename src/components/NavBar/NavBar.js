import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../images/devLogo.png';
import './NavBar.css';
import { rootPath } from '../../resources/resources';

class NavBar extends Component {
  constructor(props) {
    super(props);
    if (
      props.location.search
        .substring(1)
        .split('=')
        .pop() !== 'true'
    ) { window.location.href = `${rootPath}/auth/devmtn`; }
  }
  render() {
    return (
      <div>
        <div className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li>
              <img className="navImage" src={Logo} alt="logo" />
            </li>
            <li>
              <Link to="/example1">example1</Link>
            </li>
            <li>
              <Link to="/example2">example2</Link>
            </li>
            <li>
              <Link to="/example3">example3</Link>
            </li>
            <li>
              <a href={`${rootPath}/api/users`}>Users</a>
            </li>
            <li>
              <a href={`${rootPath}/auth/devmtn`}>
                Log{this.props.isLoggedIn ? 'out' : 'in'}
              </a>
            </li>
            <li />
          </ul>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  isLoggedIn: PropTypes.string,
  location: PropTypes.any
};

export default withRouter(NavBar);
