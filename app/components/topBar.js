import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { browserHistory } from 'react-router'
class Login extends Component {
  render() {
    return (
      <FlatButton 
        label="Login" 
        style={{color: '#fff', marginTop: '7px', fontWeight: 'bold'}} 
        onClick={() => {browserHistory.push('/login')}}
      />
    )
  }
}
class Logged extends Component {
  logout() {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/login');
  }
  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton iconStyle={{color: '#fff'}}><MoreVertIcon/></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="My profile" />
        <MenuItem 
          primaryText="Sign out" 
          onClick={this.logout}
        />
      </IconMenu>
    )
  }
}
export default class TopBar extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props.logged);
  }
  render() {
    return (
      <AppBar 
        title="WSN"
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={this.props.logged ? <Logged /> : <Login />}
      />
    );
  }
}