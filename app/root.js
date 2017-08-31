import React, {Component} from 'react'
import { Router, Route, browserHistory, IndexRoute,Redirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from'./login'
import Container from'./container'
import Home from'./home'

export default class Root extends Component {
  render() {
    return(
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Container}>
            <IndexRoute component={Home}  onEnter={requireAuth}/>
          </Route>
          <Route path="/login" component={Login}/>
        </Router>
      </MuiThemeProvider>
    )
  }
}

const requireAuth = (nextState, replace) => {
  if(!window.sessionStorage.getItem('token')) {
    replace({ pathname: '/login' })
  }
}