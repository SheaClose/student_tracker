import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Logo from '../../images/devLogo.png';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  logInLogOut() {
    if (this.props.isAuthed) {
      return <a href={`${process.env.REACT_APP_ROOT_PATH}/logout`}>Logout</a>;
    }
    return <a href={`${process.env.REACT_APP_ROOT_PATH}/auth/devmtn`}>Login</a>;
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.props.open}
          onRequestChange={this.props.toggleDrawer}
        >
          <Link to="/">
            <MenuItem
              style={{
                backgroundColor: '#496069',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '20px'
              }}
              onClick={this.props.toggleDrawer}
            >
              <img className="navImage" src={Logo} alt="logo" />
            </MenuItem>
          </Link>
          <Link to="/projects">
            <MenuItem onClick={this.props.toggleDrawer}>Projects</MenuItem>
          </Link>
          <Link to="/students">
            <MenuItem onClick={this.props.toggleDrawer}>Students</MenuItem>
          </Link>
          <Link to="/attendance">
            <MenuItem onClick={this.props.toggleDrawer}>Attendace</MenuItem>
          </Link>
          <Link to="/oneonones">
            <MenuItem onClick={this.props.toggleDrawer}>One on Ones</MenuItem>
          </Link>
          <Link to="/user">
            <MenuItem onClick={this.props.toggleDrawer}>User Info</MenuItem>
          </Link>
          <MenuItem>{this.logInLogOut()}</MenuItem>
        </Drawer>
      </div>
    );
  }
}

NavBar.propTypes = {
  isAuthed: PropTypes.bool.isRequired
};

function mapStateToProps({ mainReducer }) {
  return { isAuthed: mainReducer.isAuthed };
}

export default withRouter(connect(mapStateToProps)(NavBar));
