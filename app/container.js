import React, {Component} from 'react'
import TopBar from './components/topBar'
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    }
  }
  componentWillMount() {
    if(window.sessionStorage.getItem('token')) {
      this.setState({logged: true});
    }
  }
  render() {
    return (
      <div>
        <TopBar logged={this.state.logged}/>
        <div>{this.props.children}</div>
      </div>
    )
  }
}