import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.handleCharts = this.handleCharts.bind(this);
    this.handleDataTables = this.handleDataTables.bind(this);
    this.state = {
      dropdownActive: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleCharts(e){
    this.props.history.push('/charts');
  }

  handleDataTables(e){
    this.props.history.push('/data_tables');
  }

  toggleDropdown(e){
    this.setState({dropdownActive: !this.state.dropdownActive});
  }

  logout(e){
    this.props.logout();
  }

  render(){
    let display;

    if(this.props.currentUser){
      let dropdownDisplay;
      if(this.state.dropdownActive){
        dropdownDisplay = (
          <div className="dropdown-display">
            <label className="dropdown-label">Hi {this.props.currentUser.username}</label>
            <button onClick={this.logout} className="logout">Log Out</button>
          </div>
        );
      }else{
        dropdownDisplay = (
          <div></div>
        );
      }
      display = (
        <div className="navbar">
          <Link to='/data_tables'>
            <h1 className="logo">CHARTALIZE</h1>
          </Link>
          <div className="signin-login">
            <button onClick={this.handleCharts} className="login">Charts</button>
            <button onClick={this.handleDataTables} className="login">Data Tables</button>
            <button onClick={this.toggleDropdown} className="login">
              <i className="fa fa-user" aria-hidden="true"></i>
            </button>
            {dropdownDisplay}
          </div>
        </div>
      );
    }else {
      display = (
        <div className="navbar">
          <Link to='/'>
            <h1 className="logo">CHARTALIZE</h1>
          </Link>
          <div className="signin-login">
            <Link className="login" to='/login'>Log In</Link>
            <Link className="signup" to='/signup'>Get Started Now!</Link>
          </div>

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

export default withRouter(NavBar);
