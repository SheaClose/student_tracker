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
                Log{this.props.isAuthed ? 'out' : 'in'}
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
  isAuthed: PropTypes.bool,
  verifyLogin: PropTypes.func.isRequired
};

export default withRouter(connect(state => state, { verifyLogin })(NavBar));
