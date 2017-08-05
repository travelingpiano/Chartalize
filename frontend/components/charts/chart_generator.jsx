import React from 'react';
import {withRouter} from 'react-router';
import {values,keys} from 'lodash';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, BarChart, Bar, Cell, AreaChart, Area, defs, linearGradient, stop} from 'recharts';

class ChartGenerator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sortType: this.props.sortType
    };
    this.changeSortType = this.changeSortType.bind(this);
    this.xAxisDesc = this.xAxisDesc.bind(this);
    this.xAxisAsc = this.xAxisAsc.bind(this);
    this.yAxisAsc = this.yAxisAsc.bind(this);
    this.yAxisDesc = this.yAxisDesc.bind(this);
    this.parseData = this.parseData.bind(this);
    this.createLineChart = this.createLineChart.bind(this);
    this.createScatterChart = this.createScatterChart.bind(this);
    this.createBarChart = this.createBarChart.bind(this);
    this.createPieChart = this.createPieChart.bind(this);
    this.createAreaChart = this.createAreaChart.bind(this);
  }

  changeSortType(e){
    if(this.props.type==="Scatter"){
      this.setState({sortType: e.target.value},
      this.createScatterChart);
    }else if(this.props.type==="Line"){
      this.setState({sortType: e.target.value},
      this.createLineChart);
    }else if(this.props.type==="Bar"){
      this.setState({sortType: e.target.value},
      this.createBarChart);
    }else if(this.props.type==="Area"){
      this.setState({sortType: e.target.value},
      this.createAreaChart);
    }else if(this.props.type==="Pie"){
      this.setState({sortType: e.target.value},
      this.createPieChart);
    }else{
      this.setState({sortType: e.target.value});
    }
  }

  xAxisDesc(origData){
    for(let i = 0; i<origData.length-1;i++){
      for(let j = i+1; j < origData.length; j++){
        //if need to swap
        if(origData[i][this.props.xAxis] < origData[j][this.props.xAxis]){
          let temp = origData[i];
          origData[i] = origData[j];
          origData[j] = temp;
        }
      }
    }
    return origData;
  }

  xAxisAsc(origData){
    for(let i = 0; i<origData.length-1;i++){
      for(let j = i+1; j < origData.length; j++){
        //if need to swap
        if(origData[i][this.props.xAxis] > origData[j][this.props.xAxis]){
          let temp = origData[i];
          origData[i] = origData[j];
          origData[j] = temp;
        }
      }
    }
    return origData;
  }

  yAxisAsc(origData){
    for(let i = 0; i<origData.length-1;i++){
      for(let j = i+1; j < origData.length; j++){
        //if need to swap
        if(origData[i][this.props.yAxis] > origData[j][this.props.yAxis]){
          let temp = origData[i];
          origData[i] = origData[j];
          origData[j] = temp;
        }
      }
    }
    return origData;
  }

  yAxisDesc(origData){
    for(let i = 0; i<origData.length-1;i++){
      for(let j = i+1; j < origData.length; j++){
        //if need to swap
        if(origData[i][this.props.yAxis] < origData[j][this.props.yAxis]){
          let temp = origData[i];
          origData[i] = origData[j];
          origData[j] = temp;
        }
      }
    }
    return origData;
  }

  parseData(){
    let currentTable = this.props.table;
    let yData = [];
    let xData = [];
    let y2Data = [];
    for(let key in currentTable){
      //check if x data value is present in that row
      if(keys(currentTable[key]).includes(this.props.xAxis)){
        // four different scenarios
        if(this.props.yAxis && this.props.y2Axis){
          //check if y data value is present in that row
          if(keys(currentTable[key]).includes(this.props.yAxis) && keys(currentTable[key]).includes(this.props.y2Axis)){

            if(isNaN(Number(currentTable[key][this.props.yAxis]) || isNaN(Number(currentTable[key][this.props.y2Axis]))) ){
              return undefined;
            }else{
              let xDataVal = currentTable[key][this.props.xAxis];
              let ind = xData.indexOf(xDataVal);
              //if same xdataval has been found already;
              if(ind !== -1){
                yData[ind].push(Number(currentTable[key][this.props.yAxis]));
                y2Data[ind].push(Number(currentTable[key][this.props.y2Axis]));
              }else{
                yData.push([Number(currentTable[key][this.props.yAxis])]);
                y2Data.push([Number(currentTable[key][this.props.y2Axis])]);
                xData.push(xDataVal);
              }
            }
          }else{
            return "Two Y Axes selected, but one or more of them is missing values";
          }
        }else if(this.props.yAxis){
          if(keys(currentTable[key]).includes(this.props.yAxis)){
            if(isNaN(Number(currentTable[key][this.props.yAxis])) ){
              return undefined;
            }else{
              let xDataVal = currentTable[key][this.props.xAxis];
              let ind = xData.indexOf(xDataVal);
              //if same xdataval has been found already;
              if(ind !== -1){
                yData[ind].push(Number(currentTable[key][this.props.yAxis]));
              }else{
                yData.push([Number(currentTable[key][this.props.yAxis])]);
                xData.push(xDataVal);
              }
            }
          }else{
            return "Missing Y Data Values";
          }
        }else if(this.props.y2Axis){
          return "If only one y Axis is desired, please place axis title in y Axis instead of y2 Axis";
        }else{
          return "No Y Axis Selected";
        }
      }else{
        return "Missing X Data Values";
      }
    }

    //average out y data with same x data value s
    for(let i = 0; i<yData.length; i++){
      let yDataAvg = 0;
      for(let j = 0; j < yData[i].length; j++){
        yDataAvg += yData[i][j];
      }
      yData[i] = Math.round(yDataAvg/yData[i].length*1000)/1000;
    }
    if(y2Data.length > 0){
      for(let i = 0; i < y2Data.length; i++){
        let y2DataAvg = 0;
        for(let j = 0; j< y2Data[i].length; j++){
          y2DataAvg += y2Data[i][j];
        }
        y2Data[i] = Math.round(y2DataAvg/y2Data[i].length*1000)/1000;
      }
    }
    let data = [];
    for(let i = 0; i <yData.length; i++){
      let rowData = {};
      rowData[this.props.xAxis] = xData[i];
      rowData[this.props.yAxis] = yData[i];
      if(this.props.y2Axis){
        rowData[this.props.y2Axis] = y2Data[i];
      }
      data.push(rowData);
    }
    if(this.state.sortType==="X Axis Desc"){
      data = this.xAxisDesc(data);
    }else if(this.state.sortType==="X Axis Asc"){
      data = this.xAxisAsc(data);
    }else if(this.state.sortType==="Y Axis Asc"){
      data = this.yAxisAsc(data);
    }else if(this.state.sortType==="Y Axis Desc"){
      data = this.yAxisDesc(data);
    }
    return data;
  }

  createLineChart(e){
    if(this.props.xAxis && (this.props.yAxis || this.props.y2Axis)){
      let type= "Line";
      let data = this.parseData();
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      let y2 = this.props.y2Axis;
      if(typeof data === "string"){
        this.props.changeChart([],(<div></div>),this.props.type,[data], this.state.sortType);
      }else if(data){
        let y2ChartAxis;
        let y2ChartLine;
        if(this.props.yAxis && this.props.y2Axis){
          y2ChartAxis = (
            <YAxis yAxisId={1} dataKey={y2} name={y2} orientation="right"/>
          );
          y2ChartLine = (
            <Line yAxisId={1} type="monotone" isAnimationActive={true} nameKey={this.props.xAxis} dataKey={this.props.y2Axis} stroke={`#5B8FE1`} className="Chart" activeDot={{r: 8}}/>
          );
        }else{
          y2ChartAxis = (<div></div>);
          y2ChartLine = (<div></div>);
        }
        let Chart = (
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
        let errors = [];
        this.props.changeChart(data,Chart,type,errors, this.state.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
    }else{
      this.props.changeChart([],(<div></div>),this.props.type,["Insufficient axes provided"], this.state.sortType);
    }
  }

  createScatterChart(e){
    if(this.props.xAxis && (this.props.yAxis || this.props.y2Axis)){
      let type= "Scatter";
      let data = this.parseData();
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      let y2 = this.props.y2Axis;
      if(typeof data === "string"){
        this.props.changeChart([],(<div></div>),this.props.type,[data], this.state.sortType);
      }else if(this.props.y2Axis){
        this.props.changeChart([],(<div></div>),this.props.type,["Scatter Chart currently does not support multiple axes plotting"], this.state.sortType);
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%" >
            <ScatterChart>
                  className="PreviewChart">
                <XAxis dataKey={x} name={x} label={x}/>
                <YAxis dataKey={y} name={y} />
                <Tooltip/>
                <Scatter yAxisId={0} type="monotone" data={data} className="Chart"/>
            </ScatterChart>
          </ResponsiveContainer>
        );
        let errors = [];
        this.props.changeChart(data,Chart,type,errors, this.state.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
    }else{
      this.props.changeChart([],(<div></div>),this.props.type,["Insufficient axes provided"], this.state.sortType);
    }
  }

  createBarChart(e){
    if(this.props.xAxis && (this.props.yAxis || this.props.y2Axis)){
      let type= "Bar";
      let data = this.parseData();
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      let y2 = this.props.y2Axis;
      if(typeof data === "string"){
        this.props.changeChart([],(<div></div>),this.props.type,[data], this.state.sortType);
      }else if(this.props.y2Axis){
        this.props.changeChart([],(<div></div>),this.props.type,["Bar Chart currently does not support multiple axes plotting"], this.state.sortType);
      }else if(data){
        let Chart = (
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
        let errors = [];
        this.props.changeChart(data,Chart,type,errors, this.state.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
    }else{
      this.props.changeChart([],(<div></div>),this.props.type,["Insufficient axes provided"], this.state.sortType);
    }
  }

  createPieChart(){
    if(this.props.xAxis && (this.props.yAxis || this.props.y2Axis)){
      let type= "Pie";
      let data = this.parseData();
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      let y2 = this.props.y2Axis;
      if(typeof data === "string"){
        this.props.changeChart([],(<div></div>),this.props.type,[data], this.state.sortType);
      }else if(this.props.y2Axis){
        this.props.changeChart([],(<div></div>),this.props.type,["Pie Chart currently does not support multiple axes plotting"], this.state.sortType);
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%">
            <PieChart className="PreviewChart">
              <Pie isAnimationActive={true} nameKey={x} dataKey={y} data={data} className="PieChart">{
                  data.map((entry, index) => <Cell className={`PieCell${index%2}`}/>)
                }</Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        );
        let errors = [];
        this.props.changeChart(data,Chart,type,errors, this.state.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
    }else{
      this.props.changeChart([],(<div></div>),this.props.type,["Insufficient axes provided"], this.state.sortType);
    }
  }

  createAreaChart(e){
    if(this.props.xAxis && (this.props.yAxis || this.props.y2Axis)){
      let type= "Area";
      let data = this.parseData();
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      let y2 = this.props.y2Axis;
      if(typeof data === "string"){
        this.props.changeChart([],(<div></div>),this.props.type,[data], this.state.sortType);
      }else if(data){
        let y2ChartAxis;
        let y2ChartLine;
        if(this.props.yAxis && this.props.y2Axis){
          y2ChartAxis = (
            <YAxis yAxisId={1} dataKey={y2} name={y2} orientation="right"/>
          );
          y2ChartLine = (
            <Area yAxisId={1} type="monotone" isAnimationActive={true} nameKey={this.props.xAxis} dataKey={this.props.y2Axis} stroke={`#5B8FE1`} className="Chart" />
          );
        }else{
          y2ChartAxis = (<div></div>);
          y2ChartLine = (<div></div>);
        }
        let Chart = (
          <ResponsiveContainer width="90%" height="80%">
            <AreaChart data={data} className="PreviewChart">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`#${this.props.color}`} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={`#${this.props.color}`} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis dataKey={x} name={x} label={x}/>
              <YAxis yAxisId={0} dataKey={y} name={y} />
              {y2ChartAxis}
              <Area yAxisId={0} type="monotone" isAnimationActive={true} nameKey={this.props.xAxis} dataKey={this.props.yAxis} stroke={`#${this.props.color}`} fillOpacity={0.8} fill="url(#grad)" className="Chart" />
              {y2ChartLine}
              <Tooltip/>
            </AreaChart>
          </ResponsiveContainer>
        );
        let errors = [];
        this.props.changeChart(data,Chart,type,errors, this.state.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
    }else{
      this.props.changeChart([],(<div></div>),this.props.type,["Insufficient axes provided"], this.state.sortType);
    }
  }

  render(){
    return (
      <div className="ChartButtons">
        <button onClick={this.createLineChart}>
          <i className="fa fa-line-chart" aria-hidden="true"></i>
        </button>
        <button onClick={this.createScatterChart}>
          <img src="https://png.icons8.com/scatter-plot/win10/48" title="Scatter Plot"/>
        </button>
        <button onClick={this.createBarChart}>
          <i className="fa fa-bar-chart" aria-hidden="true"></i>
        </button>
        <button onClick={this.createPieChart}>
          <i className="fa fa-pie-chart" aria-hidden="true"></i>
        </button>
        <button onClick={this.createAreaChart}>
          <i className="fa fa-area-chart" aria-hidden="true"></i>
        </button>
        <label className="SelectionsTitle">Sort by:</label>
        <select onChange={this.changeSortType} className="Dropdown-Option">
          <option default value="X Axis Asc" >X Axis Asc</option>
          <option value="X Axis Desc">X Axis Desc</option>
          <option value="Y Axis Asc">Y Axis Asc</option>
          <option value="Y Axis Desc">Y Axis Desc</option>
        </select>
      </div>
    );
  }
}

export default withRouter(ChartGenerator);
