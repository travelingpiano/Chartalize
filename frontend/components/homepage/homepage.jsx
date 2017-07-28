import React from 'react';
import {withRouter} from 'react-router';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import SessionFormContainer from '../session/session_form_container';
import NavBarContainer from '../navbar/navbar_container';

const chartData = {
  title: "Golden State Warriors Over The Years",
  x: "Year",
  y: "Games Won",
  data: [
    {"Year": 2006, "Games Won": 34},
    {"Year": 2007, "Games Won": 42},
    {"Year": 2008, "Games Won": 48},
    {"Year": 2009, "Games Won": 29},
    {"Year": 2010, "Games Won": 26},
    {"Year": 2011, "Games Won": 36},
    {"Year": 2012, "Games Won": 23},
    {"Year": 2013, "Games Won": 47},
    {"Year": 2014, "Games Won": 51},
    {"Year": 2015, "Games Won": 67},
    {"Year": 2016, "Games Won": 73},
    {"Year": 2017, "Games Won": 67}
  ]
};

class Homepage extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      modelActive: false,
      formType: ""
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
    this.toLogin = this.toLogin.bind(this);
    this.toSignup = this.toSignup.bind(this);
  }

  toLogin(e){
    this.setState({modalActive: true, formType: "/login"});
  }

  toSignup(e){
    this.setState({modalActive: true, formType: '/signup'});
  }

  handleCloseModal(e){
    this.setState({modalActive: false});
  }

  toggleFormType(e){
    e.preventDefault();
    if(this.state.formType==="/login"){
      this.setState({formType: '/signup'});
    }else{
      this.setState({formType: '/login'});
    }
  }

  render(){
    return (
      <div>
        <NavBarContainer formType={this.state.formType} toLogin={(e)=>this.toLogin(e)} toSignup={(e)=>this.toSignup(e)}/>
        <div className="Homepage">
          <div className="Homepage-main">
            <div className="Homepage-description">
              <label className="homepage-text">
                Having trouble visualizing your data, try Chartalize!
              </label>
              <button className="homepage-button" onClick={this.toSignup}>Get Started Today</button>
            </div>
            <div className="homepage-chart" >
              <label className="homepage-chart-title">{chartData.title}</label>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={chartData.data}
                      className="PreviewChart">
                   <XAxis dataKey={chartData.x} name={chartData.x} label={chartData.x}/>
                   <YAxis dataKey={chartData.y} name={chartData.y} />
                   <Tooltip/>
                   <Legend />
                   <Line isAnimationActive={true} type="monotone" dataKey={chartData.y} stroke="#253A5C" activeDot={{r: 8}}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="Homepage-footer">
            <div className="creatorLinks">
              <a target="_blank" href="https://www.linkedin.com/in/li-hsuan-lu-92389a41">
                <i className="fa fa-linkedin-square" aria-hidden="true"></i>
              </a>
              <a target="_blank" href="https://github.com/travelingpiano">
                <i className="fa fa-github-square" aria-hidden="true"></i>
              </a>
            </div>
            <label className="creatorLine">
              Created and maintained by Li Hsuan Lu
            </label>
          </div>
          <Modal isOpen={this.state.modalActive} className="Modal" overlayClassName={{
              base: "Modal-Overlay",
              afterOpen: "Modal-Overlay",
              beforeClose: "Modal-Overlay",
            }} contentLabel="Modal" onRequestClose={this.handleCloseModal}>
            <button className="modalClose" onClick={this.handleCloseModal}>
              <i className="fa fa-window-close" aria-hidden="true"></i>
            </button>
            <SessionFormContainer formType={this.state.formType} toggleFormType={(e)=>this.toggleFormType(e)}/>
          </Modal>
        </div>
      </div>
    );
  }
}

export default withRouter(Homepage);
