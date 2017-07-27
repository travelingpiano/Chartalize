import React from 'react';
import {withRouter} from 'react-router';
import SideBar from '../navbar/side_bar';
import NavBarContainer from '../navbar/navbar_container';

class ShareChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      sharedUsers: []
    };
    this.changeSearch = this.changeSearch.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.shareChart = this.shareChart.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllUsers();
    this.props.fetchOneChart(this.props.match.params.chartId);
  }

  componentWillReceiveProps(newProps){
    if(newProps.chart !== this.props.chart){
      this.setState({sharedUsers: newProps.chart.shared_users});
    }
  }

  changeSearch(e){
    this.setState({search: e.target.value});
  }

  addUser(e){
    let sharedUsers = this.state.sharedUsers;
    let exist = false;
    for(let i = 0; i< this.props.users.length; i++){
      if(this.props.users[i].username === e.target.value){
        exist = true;
      }
    }
    if(sharedUsers.indexOf(e.target.value)===-1 && exist){
      sharedUsers.push(e.target.value);
    }
    this.setState({sharedUsers, search: ""});
  }

  removeUser(e){
    let sharedUsers = [];
    for(let i = 0; i<this.state.sharedUsers.length; i++){
      if(this.state.sharedUsers[i] != e.target.value){
        sharedUsers.push(this.state.sharedUsers[i]);
      }
    }
    this.setState({sharedUsers});
  }

  shareChart(e){
    let chart = {};
    chart.chart = {};
    chart.chart.shared_users = this.state.sharedUsers;
    this.props.editChart(chart, this.props.match.params.chartId).then(
      this.props.history.push('/charts')
    );
  }

  render(){
    let display;
    if(this.props.chart.id && this.props.users[0]){
      let usersMatch = [];
      for(let i = 0; i<this.props.users.length; i++){
        if(
          this.state.search.toLowerCase().includes(this.props.users[i].username.toLowerCase()) ||
          this.props.users[i].username.toLowerCase().includes(this.state.search.toLowerCase())
        ){
          usersMatch.push(this.props.users[i]);
        }
      }
      display = (
        <div className="DataTables">
          <label className="tableTitle">Sharing {this.props.chart.title}</label>
          <div className="searchBar">
            <input list="users" value={this.state.search} onChange={this.changeSearch} className="searchInput" placeholder="Search User"></input>
            <datalist id="users">
              {usersMatch.map((user,idx)=>
              <option key={idx} value={user.username} onClick={this.addUser}></option>)}
            </datalist>
            <button value={this.state.search} onClick={this.addUser} className="searchButton">Add User</button>
          </div>
          <div className="shared-users">
            <div className="shared-list">
              <label className="shared-title">Current Shared Users</label>
              <ul className="users-list">
                {this.state.sharedUsers.map((user,idx)=>
                <li key={idx} className="users-item">
                  <div className="users-item-value">{user}</div>
                  <div className="users-item-value"><button value={user} onClick={this.removeUser}>Remove</button>
                  </div>
                </li>)}
              </ul>
            </div>
            <button className="searchButton" onClick={this.shareChart}>Share</button>
          </div>

        </div>
      );
    }else{
      display = (
        <div>Broke</div>
      );
    }
    return (
      <div>
        <NavBarContainer />
        <div className="dataTables">
          <SideBar currentPage="chart_share" />
          {display}
        </div>
      </div>
    );
  }
}

export default withRouter(ShareChart);
