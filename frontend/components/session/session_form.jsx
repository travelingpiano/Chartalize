import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: "",
      prevPath: this.props.location
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.demo_user = {username: "ChartalizeMaster", password: "password"};
  }

  componentWillReceiveProps(newProps){
    if(newProps.location !== this.props.location){
      this.setState({prevPath: this.props.location});
    }
  }

  changeUsername(e){
    this.setState({username: e.target.value, errors: "clear"});
  }

  changePassword(e){
    this.setState({password: e.target.value, errors: "clear"});
  }

  handleSubmit(e){
    e.preventDefault();
    const user = {user:{username: this.state.username, password: this.state.password}};
    this.props.processForm(user);
    this.setState({username: "", password: "", errors: "", prevPath: this.props.location});
  }

  handleDemo(e){
    e.preventDefault();

    let user = {};

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

  render(){
    let direct_to = this.props.formType==='/login' ? 'signup' : 'login';
    let authformtype = this.props.formType==='/login' ? 'Login' : 'Sign Up';
    let welcome_sign = this.props.formType==='/login' ? 'Welcome back to Chartalize!' : 'Join the family!';
    let errors;
    if(this.state.errors === "clear" || this.props.errors.length===0 || this.props.location !== this.state.prevPath){
      errors = (<p></p>);
    }else{
      errors = (
        <ul className="errors">{this.props.errors.map((error,idx)=>(
            <li key={idx}>{error}</li>
          ))}</ul>
      );
    }
    if(this.props.loggedIn){
      return (
        <Redirect to='/' />
      );
    }else{
      return (
        <form className="authform">
          <h1 className="login-welcome">{welcome_sign}</h1>
          {errors}
          <input placeholder="username" value={this.state.username} onChange={this.changeUsername} className="form_content"></input>
          <input type="password" placeholder="password" value={this.state.password} onChange={this.changePassword} className="form_content"></input>
          <button className="auth-button" onClick={this.handleSubmit}>{authformtype}</button>
          <button className="auth-button" onClick={this.handleDemo}>Demo</button>
          <Link to={`/${direct_to}`} className="changeauth">{direct_to} instead?</Link>
        </form>
      );
    }
  }
}

export default SessionForm;
