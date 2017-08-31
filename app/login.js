import React, {Component, PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router'

import getJSON from './getJSON'

const authUrl = '/authenticate';
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}
	componentDidMount() {
		this.usernameInput.focus();
	}
	checkLogin() {
		let username = this.state.username, password = this.state.password;
		if(!!username && !!password) {
			getJSON(authUrl, {username: username, password: password}).then(function(json) {
				console.log(json);
				window.sessionStorage.setItem('token', json.token);  //用于保存登录状态
				browserHistory.push('/');
		  }, function(err) {
		  	console.log(err);
		  });
		} else {
				console.log('不能为空！');
		}
	}
	render() {
		return (
			<div id="login-page">
				<Paper zDepth={5} style={paper}>
					<div style={header}>WSN Protocol</div>
          <form style = {{marginTop:'20px'}}>
	          <TextField
              floatingLabelText="username"
              floatingLabelFixed = {true}
              floatingLabelStyle = {{color:'#29b6f6', fontSize: '18px'}}
              underlineFocusStyle = {{borderColor:'#29b6f6'}}

	
              ref = {(input) => {this.usernameInput = input}}
              value = {this.state.username}
              onChange = {(e) =>  {this.setState({username: e.target.value})}}
            />
						<FontIcon
              className = "fa fa-user"
              style = {iconStyles}
              color = "#29b6f6"
            /><br />
            <TextField
              type="password"
              floatingLabelText="password"
              floatingLabelFixed = {true}
              floatingLabelStyle = {{color:'#29b6f6', fontSize: '18px',}}
              underlineFocusStyle = {{borderColor:'#29b6f6'}}

              ref = {(input) => {this.passwordInput = input}}
              value = {this.state.password}
              onChange = {(e) =>  {this.setState({password: e.target.value})}}
            />
            <FontIcon
              className = "fa fa-unlock-alt"
              style = {iconStyles}
              color = "#29b6f6"
            /><br />
            <RaisedButton label="LOGIN" primary={true} style={{marginTop: '20px', width: '300px'}}
							onClick = {() => {this.checkLogin()}}
            />
          </form>
				</Paper>
			</div>
		)           
	}
}

const overlay = {
		position:  'absolute',
		opacity: '0.6',
		width: '100%',
		height: '100%',
		backgroundColor: '#1c2b36',
},
paper = {
		width: '500px',
		height: '400px',
		position:  'absolute',
		top: '50%',
		left: '50%',
		marginTop: '-200px',
		marginLeft: '-250px',
		backgroundColor:'#cfd8dc',
		borderRadius: '2px',
		overflow: 'hidden',
		zIndex: 1,
		textAlign: 'center',
		boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
		boxShadow: '0 0 25px #000',
},
header = {
		fontSize:'28px', 
		color:'#3e535d',
		marginTop:'40px',
		fontWeight: "bolder",
		letterSpacing: "1px",
		userSelect:'none'
},
iconStyles = {
	marginLeft: 24
};