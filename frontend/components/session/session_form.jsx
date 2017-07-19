import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.demo_user = {username: "ChartalizeMaster", password: "password"};
  }

  changeUsername(e){
    this.setState({username: e.target.value});
  }

  changePassword(e){
    this.setState({password: e.target.value});
  }

  handleSubmit(e){
    const user = {user:this.state};
    this.props.processForm(user);
  }

  handleDemo(e){

    let user = {};
    // this.recursive_username(this.demo_user.username);

    let username = this.demo_user.username;
    const setusername = setInterval(()=>{
      if(this.demo_user.username===""){
        clearInterval(setusername);
        const setpassword = setInterval(()=>{
          if(this.demo_user.password===""){
            clearInterval(setpassword);
            user = {user:this.state};
            this.props.login(user);
          }else{
            this.setState({password: this.state.password+this.demo_user.password[0]});
            this.demo_user.password = this.demo_user.password.slice(1);
          }
        },100);
      }else{
        this.setState({username: this.state.username+this.demo_user.username[0]});
        this.demo_user.username = this.demo_user.username.slice(1);
      }
    },100);
  }

  munyoset_username(setintervalid){

  }

  render(){
    let direct_to = this.props.formType==='/login' ? 'signup' : 'login';
    let authformtype = this.props.formType==='/login' ? 'Login' : 'Sign Up';
    let welcome_sign = this.props.formType==='/login' ? 'Welcome back to Chartalize!' : 'Join the family!';
    if(this.props.loggedIn){
      return (
        <Redirect to='/' />
      );
    }else{
      return (
        <form className="authform">
          <h1 className="login-welcome">{welcome_sign}</h1>
          <ul className="errors">{this.props.errors.map((error,idx)=>(
              <li key={idx}>{error}</li>
            ))}</ul>
          <input placeholder="username" value={this.state.username} onChange={this.changeUsername} className="form_content"></input>
          <input type="password" placeholder="password" value={this.state.password} onChange={this.changePassword} className="form_content"></input>
          <input value={authformtype} type="Submit" className="auth-button" onClick={this.handleSubmit}></input>
          <button className="auth-button" onClick={this.handleDemo}>Demo</button>
          <Link to={`/${direct_to}`} className="changeauth">{direct_to} instead?</Link>
        </form>
      );
    }
  }
}

export default SessionForm;
