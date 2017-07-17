import React from 'react';
import {Link} from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const user = {user:this.state};
    this.props.processForm(user);
  }

  render(){
    let direct_to = this.props.formType==='/login' ? 'signup' : 'login';
    return (
      <form onSubmit={this.handleSubmit}>
        <Link to={`/${direct_to}`}>{direct_to} instead?</Link>
        <label>{this.props.errors}</label>
        <label>Username</label>
        <input value={this.state.username} onChange={this.changeUsername}></input>
        <label>Password</label>
        <input value={this.state.password} onChange={this.changePassword}></input>
        <input type="Submit">{this.props.formType}</input>
      </form>
    );
  }
}

export default SessionForm;
