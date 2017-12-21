import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../../images/devLogo.png';
import './NavBar.css';
import { rootPath } from '../../resources/resources';
import { verifyLogin } from '../../ducks/actions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    if (!props.isAuthed) {
      props.verifyLogin();
    }
  }
  logInLogOut() {
    if (this.props.isAuthed) {
      return <a href={`${rootPath}/logout`}>Logout</a>;
    }
    return <a href={`${rootPath}/auth/devmtn`}>Login</a>;
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
            <li>{this.logInLogOut()}</li>
            <li />
          </ul>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  verifyLogin: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    // eslint-disable-next-line
    ({ isAuthed, verifyLogin, pendingAuth }) => ({
      isAuthed,
      verifyLogin
    }),
    { verifyLogin }
  )(NavBar)
);
