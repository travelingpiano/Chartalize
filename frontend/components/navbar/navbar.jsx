import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {findDOMNode} from 'react-dom';

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.handleCharts = this.handleCharts.bind(this);
    this.handleDataTables = this.handleDataTables.bind(this);
    this.state = {
      dropdownActive: false,
      formType: this.props.formType
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount(){
    window.addEventListener('click',this.handleOutsideClick);
    window.addEventListener('touchstart',this.handleOutsideClick);
  }

  componentWillUnmount(){
    window.removeEventListener('click',this.handleOutsideClick);
    window.removeEventListener('touchstart',this.handleOutsideClick);
  }

  handleOutsideClick(e){
    const dropdown = findDOMNode(this).getElementsByClassName('dropdownTrigger')[0];
    const icon = findDOMNode(this).getElementsByClassName('fa-user')[0];
    if(e.target!==dropdown && e.target !== icon){
      this.setState({dropdownActive: false});
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({dropdownActive: false});
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
          <div className="dropdown-display animated fadeIn">
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
            <button onClick={this.toggleDropdown} className="login dropdownTrigger">
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
            <button value={this.state.formType} onClick={this.props.toLogin} className="login">Log In</button>
            <button value={this.state.formType} onClick={this.props.toSignup} className="signup">Get Started Now!</button>
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
