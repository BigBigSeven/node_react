import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from'./components/MyAwesomeReactComponent'

export default class Root extends Component {
    render() {
        return(
            <MuiThemeProvider>
                <MyAwesomeReactComponent />
            </MuiThemeProvider>
        )
    }
}