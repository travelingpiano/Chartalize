import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e){
    this.props.logout();
  }

  render(){
    let display;
    if(this.props.currentUser){
      display = (
        <div>
          <h1>Welcome {this.props.currentUser.username}</h1>
          <button onClick={this.logout}>Log Out</button>
        </div>

      );
    }else {
      display = (
        <div>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Log In</Link>
        </div>
      );
    }
    return (
      <div>
        {display}
      </div>
    );
  }
}

export default NavBar;
