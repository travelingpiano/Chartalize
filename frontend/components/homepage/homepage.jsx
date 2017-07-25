import React from 'react';
import {withRouter} from 'react-router';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {Link} from 'react-router-dom';

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
  render(){
    return (
      <div className="Homepage">
        <div className="Homepage-main">
          <div className="Homepage-description">
            <label className="homepage-text">
              Having trouble visualizing your data, try Chartalize!
            </label>
            <Link to="/signup" className="homepage-button">Get Started Today!</Link>
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
      </div>
    );
  }
}

export default withRouter(Homepage);
