import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Logo from '../../images/devLogo.png';
import './NavBar.css';
import { rootPath } from '../../resources/resources';
import { verifyLogin } from '../../ducks/actions';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    if (!props.isAuthed) {
      props.verifyLogin();
    }
    this.handleToggle = this.handleToggle.bind(this);
  }
  logInLogOut() {
    if (this.props.isAuthed) {
      return <a href={`${rootPath}/logout`}>Logout</a>;
    }
    return <a href={`${rootPath}/auth/devmtn`}>Login</a>;
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <i
          onClick={this.handleToggle}
          style={{ color: '#23ACD6' }}
          className="material-icons nav_icon"
        >
          &#xE5D2;
        </i>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <Link to="/">
            <MenuItem
              style={{
                backgroundColor: '#496069',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '20px'
              }}
              onClick={this.handleToggle}
            >
              <img className="navImage" src={Logo} alt="logo" />
            </MenuItem>
          </Link>
          <Link to="/projects">
            <MenuItem onClick={this.handleToggle}>Projects</MenuItem>
          </Link>
          <Link to="/students">
            <MenuItem onClick={this.handleToggle}>Students</MenuItem>
          </Link>
          <Link to="/attendance">
            <MenuItem onClick={this.handleToggle}>Attendace</MenuItem>
          </Link>
          <Link to="/user">
            <MenuItem onClick={this.handleToggle}>User Info</MenuItem>
          </Link>
          <MenuItem>{this.logInLogOut()}</MenuItem>
        </Drawer>
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
