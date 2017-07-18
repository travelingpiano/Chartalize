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
  }

  changeUsername(e){
    this.setState({username: e.target.value});
  }

  changePassword(e){
    this.setState({password: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    const user = {user:this.state};
    this.props.processForm(user);
  }

  handleDemo(e){
    let demo_user = {user:{username: "ChartalizeMaster", password: "password"}};

    this.props.processForm(user);
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
        <form onSubmit={this.handleSubmit} className="authform">
          <h1 className="login-welcome">{welcome_sign}</h1>
          <label>{this.props.errors}</label>
          <input placeholder="username" value={this.state.username} onChange={this.changeUsername} className="form_content"></input>
          <input type="password" placeholder="password" value={this.state.password} onChange={this.changePassword} className="form_content"></input>
          <input value={authformtype} type="Submit" className="auth-button"></input>
          <button></button>
          <Link to={`/${direct_to}`} className="changeauth">{direct_to} instead?</Link>
        </form>
      );
    }
  }
}

export default SessionForm;
