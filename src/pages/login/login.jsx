import React from 'react';
import {Switch, Link,withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import './login.css'
class Login extends React.Component {
  constructor(props,context) {
    super(props,context)
    this.state = {
      username: '',
      password: '',
    }
  }
  render() {
    return (
      <div className="login">
        <div className="content">
          <input className="username" type="text" value={this.state.username} onChange={this.usernameChange.bind(this)} />
          <input className="password" type="password" value={this.state.password} onChange={this.passwordChange.bind(this)} />
          <a className="btn" onClick={this.login.bind(this)}>登录</a>
        </div>
      </div>
    )
  }
  usernameChange(event) {
    this.setState({ username: event.target.value });
  }
  passwordChange(event) {
    this.setState({ password: event.target.value });
  }
  login() {
    let { history } = this.props;
    if(this.state.username&&this.state.password){
      this.props.LOGIN(history)
    }
  }
}

function mapStateToProps(state){
  return {
    isLogin:state.isLogin
  }
}
function mapDispatchToProps(dispatch){
  return {
    LOGIN:function(history){
      dispatch({type:'GO_LOGIN'})
      history.push({pathname:"/index"})
    }
  }
}

//封装传递state和dispatch
var LoginReactRedux = connect(mapStateToProps,mapDispatchToProps)(Login);

//导出组件
export default withRouter(LoginReactRedux);