import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../images/devLogo.png';
import './NavBar.css';

class NavBar extends Component {
  render() {
    const devLogin =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
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
              <a href={`${devLogin}/api/mentors`}>Mentors</a>
            </li>
            <li>
              <a href={`${devLogin}/auth/devmtn`}>
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
  isLoggedIn: PropTypes.string
};

export default NavBar;
