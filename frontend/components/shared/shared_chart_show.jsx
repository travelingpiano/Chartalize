import React from 'react';
import {withRouter} from 'react-router';
import SideBar from '../navbar/side_bar';
import NavBarContainer from '../navbar/navbar_container';
import {values} from 'lodash';
import {XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart,Line, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, AreaChart, Area, Cell, linearGradient, defs, stop} from 'recharts';

class SharedChartShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      chart: (<div></div>),
      title: ""
    };
    this.formChart = this.formChart.bind(this);
    this.formLineChart = this.formLineChart.bind(this);
    this.formBarChart = this.formBarChart.bind(this);
    this.formPieChart = this.formPieChart.bind(this);
    this.formScatterPlot = this.formScatterPlot.bind(this);
    this.formAreaChart = this.formAreaChart.bind(this);
    this.parseData = this.parseData.bind(this);
  }
  componentDidMount(){
    this.props.fetchSharedChart(this.props.match.params.chartId);
  }

  componentWillReceiveProps(newProps){
    if(this.state.title !== newProps.chart.title){
      let chart = this.formChart(newProps.chart);
      this.setState({chart,title: newProps.chart.title});
    }
  }

  formChart(chartObj){
    if(chartObj.chart_type==="Line"){
      return this.formLineChart(chartObj);
    }else if(chartObj.chart_type==="Bar"){
      return this.formBarChart(chartObj);
    }else if(chartObj.chart_type==="Scatter"){
      return this.formScatterPlot(chartObj);
    }else if(chartObj.chart_type==="Pie"){
      return this.formPieChart(chartObj);
    }else if(chartObj.chart_type==="Area"){
      return this.formAreaChart(chartObj);
    }
  }

  parseData(chartObj){
    let data = values(chartObj.data);
    for(let i = 0; i<data.length; i++){
      for(let key in data[i]){
        if(key===chartObj.xAxis){
          data[i][key] = data[i][key];
        }else{
          data[i][key] = Number(data[i][key]);
        }
      }
    }
    return data;
  }

  formLineChart(chartObj){
    let data = this.parseData(chartObj);
    let x = chartObj.xAxis;
    let y = chartObj.yAxis;
    let y2 = chartObj.y2Axis;
    let y2ChartAxis;
    let y2ChartLine;
    if(y2){
      y2ChartAxis = (
        <YAxis yAxisId={1} dataKey={y2} name={y2} orientation="right"/>
      );
      y2ChartLine = (
        <Line yAxisId={1} type="monotone" isAnimationActive={true} nameKey={x} dataKey={y2} stroke={`#5B8FE1`} className="Chart" activeDot={{r: 8}}/>
      );
    }else{
      y2ChartAxis = (<div></div>);
      y2ChartLine = (<div></div>);
    }
    return (
      <ResponsiveContainer width="90%" height="80%" >
        <LineChart data={data}
              className="PreviewChart">
           <XAxis dataKey={x} name={x} label={x}/>
           <YAxis dataKey={y} name={y} />
           {y2ChartAxis}
           <Tooltip/>
           <Legend />
           <Line isAnimationActive={true} type="monotone" dataKey={y} stroke="#253A5C" activeDot={{r: 8}}/>
           {y2ChartLine}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  formBarChart(chartObj){
    let data = this.parseData(chartObj.data);
    let x = chartObj.xAxis;
    let y = chartObj.yAxis;
    return (
      <ResponsiveContainer width="90%" height="80%">
        <BarChart data={data}
              className="PreviewChart">
           <XAxis dataKey={x} name={x} label={x}/>
           <YAxis dataKey={y} name={y} />
           <Tooltip/>
           <Legend />
           <Bar type="monotone" dataKey={y} className="Chart"/>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  formScatterPlot(chartObj){
    let data = this.parseData(chartObj.data);
    let x = chartObj.xAxis;
    let y = chartObj.yAxis;
    return (
      <ResponsiveContainer width="90%" height="80%" >

        <ScatterChart
              className="PreviewChart">
            <XAxis dataKey={x} name={x} label={x}/>
            <YAxis dataKey={y} name={y} />
            <Tooltip/>
            <Scatter type="monotone" data={data} className="Chart"/>
        </ScatterChart>
      </ResponsiveContainer>
    );
  }

  formPieChart(chartObj){
    let data = this.parseData(chartObj.data);
    let x = chartObj.xAxis;
    let y = chartObj.yAxis;
    return (
      <ResponsiveContainer width="90%" height="80%">
        <PieChart className="PreviewChart">
          <Pie isAnimationActive={true} nameKey={x} dataKey={y} data={data} className="PieChart">{
              data.map((entry, index) => <Cell className={`PieCell${index%2}`}/>)
            }</Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    );
  }

  formAreaChart(chartObj){
    let data = this.parseData(chartObj);
    let x = chartObj.xAxis;
    let y = chartObj.yAxis;
    let y2 = chartObj.y2Axis;
    let y2ChartAxis;
    let y2ChartLine;
    if(y2){
      y2ChartAxis = (
        <YAxis yAxisId={1} dataKey={y2} name={y2} orientation="right"/>
      );
      y2ChartLine = (
        <Area yAxisId={1} type="monotone" isAnimationActive={true} nameKey={x} dataKey={y2} stroke={`#5B8FE1`} className="Chart"/>
      );
    }else{
      y2ChartAxis = (<div></div>);
      y2ChartLine = (<div></div>);
    }
    return (
      <ResponsiveContainer width="90%" height="80%">
        <AreaChart data={data} className="PreviewChart">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#253A5C" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#253A5C" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <XAxis dataKey={x} name={x} label={x}/>
          <YAxis dataKey={y} name={y} />
          {y2ChartAxis}
          <Area type="monotone" isAnimationActive={true} nameKey={x} dataKey={y} stroke="#253A5C" fillOpacity={0.8} fill="url(#grad)"  className="Chart" />
          {y2ChartLine}
          <Tooltip/>
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  render(){
    let display;
    if(this.props.chart.title){
      display = (
        <div className="DataTables">
          <label className="tableTitle">{this.props.chart.title}</label>
          {this.state.chart}
        </div>
      );
    }else{
      display = (<div></div>);
    }
    return (
      <div>
        <NavBarContainer />
          <div className="dataTables">
            <SideBar currentPage="shared_chart_show" />
            {display}
          </div>
      </div>
    );
  }
}

export default withRouter(SharedChartShow);
