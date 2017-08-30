import React, {Component} from 'react'
import { Router, Route, browserHistory, IndexRoute,Redirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from'./components/MyAwesomeReactComponent'
import Login from'./login'
import Container from'./container'
import Home from'./home'

export default class Root extends Component {
  render() {
    return(
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Container}>
            <IndexRoute component={Home} />
          </Route>
          <Route path="/login" component={Login}/>
        </Router>
      </MuiThemeProvider>
    )
  }
}