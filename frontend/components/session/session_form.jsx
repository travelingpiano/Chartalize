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

  render(){
    let direct_to = this.props.formType==='/login' ? 'signup' : 'login';
    if(this.props.loggedIn){
      return (
        <Redirect to='/' />
      );
    }else{
      console.log(this.props.errors);
      return (
        <form onSubmit={this.handleSubmit}>
          <Link to={`/${direct_to}`}>{direct_to} instead?</Link>
          <label>{this.props.errors}</label>
          <label>Username</label>
          <input value={this.state.username} onChange={this.changeUsername}></input>
          <label>Password</label>
          <input value={this.state.password} onChange={this.changePassword}></input>
          <input value={this.props.formType} type="Submit" ></input>
        </form>
      );
    }
  }
}

export default SessionForm;
