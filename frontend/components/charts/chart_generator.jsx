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
    let xData = [];
    let yData = [];
    let xSortedData = [];
    for(let i = 0; i<origData.length; i++){
      xData.push(origData[i][this.props.xAxis]);
      yData.push(origData[i][this.props.yAxis]);
      xSortedData.push(origData[i][this.props.xAxis]);
    }
    xSortedData.sort().reverse();
    let ySortedData = [];
    for(let i = 0; i< origData.length; i++){
      let ind = xData.indexOf(xSortedData[i]);
      ySortedData.push(yData[ind]);
    }
    let data = [];
    for(let i = 0; i <yData.length; i++){
      let rowData = {};
      rowData[this.props.xAxis] = xSortedData[i];
      rowData[this.props.yAxis] = ySortedData[i];
      data.push(rowData);
    }
    return data;
  }

  xAxisAsc(origData){
    let xData = [];
    let yData = [];
    let xSortedData = [];
    for(let i = 0; i<origData.length; i++){
      xData.push(origData[i][this.props.xAxis]);
      yData.push(origData[i][this.props.yAxis]);
      xSortedData.push(origData[i][this.props.xAxis]);
    }
    xSortedData.sort();
    let ySortedData = [];
    for(let i = 0; i< origData.length; i++){
      let ind = xData.indexOf(xSortedData[i]);
      ySortedData.push(yData[ind]);
    }
    let data = [];
    for(let i = 0; i <yData.length; i++){
      let rowData = {};
      rowData[this.props.xAxis] = xSortedData[i];
      rowData[this.props.yAxis] = ySortedData[i];
      data.push(rowData);
    }
    return data;
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
    for(let key in currentTable){
      //check if x data value is present in that row
      if(keys(currentTable[key]).includes(this.props.xAxis)){
        //check if y data value is present in that row
        if(keys(currentTable[key]).includes(this.props.yAxis)){
          if(isNaN(Number(currentTable[key][this.props.yAxis]))){
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
    let data = [];
    for(let i = 0; i <yData.length; i++){
      let rowData = {};
      rowData[this.props.xAxis] = xData[i];
      rowData[this.props.yAxis] = yData[i];
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
    let type = "Line";
    if(this.props.xAxis && this.props.yAxis){
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      let data = this.parseData();
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%" >

            <LineChart data={data}
                  className="PreviewChart">
               <text className="Axis-Label">x axis</text>
               <XAxis dataKey={x} name={x} label={x}/>
               <YAxis dataKey={y} name={y} />
               <Tooltip/>
               <Legend />
               <Line isAnimationActive={true} type="monotone" dataKey={y} stroke={`#${this.props.color}`} activeDot={{r: 8}}/>
            </LineChart>
          </ResponsiveContainer>
        );
        let errors = [];
        this.props.changeChart(data,Chart,type,errors, this.state.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
    }
  }

  createScatterChart(e){
    let type = "Scatter";
    if(this.props.xAxis && this.props.yAxis){
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      let data = this.parseData();
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%" >

            <ScatterChart
                  className="PreviewChart">
                <XAxis dataKey={x} name={x} label={x}/>
                <YAxis dataKey={y} name={y} />
                <Tooltip/>
                <Scatter type="monotone" data={data} className="Chart" fill={`#${this.props.color}`}/>
            </ScatterChart>
          </ResponsiveContainer>
        );
        let errors = [];
        this.props.changeChart(data,Chart,type,errors, this.state.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
    }
  }

  createBarChart(e){
    if(this.props.xAxis && this.props.yAxis){
      let type = "Bar";
      let data = this.parseData();
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%">
            <BarChart data={data}
                  className="PreviewChart">
               <XAxis dataKey={x} name={x} label={x}/>
               <YAxis dataKey={y} name={y} />
               <Tooltip/>
               <Legend />
               <Bar type="monotone" dataKey={y} className="Chart" fill={`#${this.props.color}`}/>
            </BarChart>
          </ResponsiveContainer>
        );
        let errors = [];
        this.props.changeChart(data,Chart,type,errors, this.state.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
    }
  }

  createPieChart(){
    if(this.props.xAxis && this.props.yAxis){
      let type= "Pie";
      let data = this.parseData();
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
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
        this.props.changeChart(data,Chart,type,errors, this.props.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
    }
  }

  createAreaChart(e){
    if(this.props.xAxis && this.props.yAxis){
      let type= "Area";
      let data = this.parseData();
      let x = this.props.xAxis;
      let y = this.props.yAxis;
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
      }else if(data){
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
              <YAxis dataKey={y} name={y} />
              <Area type="monotone" isAnimationActive={true} nameKey={this.props.xAxis} dataKey={this.props.yAxis} stroke={`#${this.props.color}`} fillOpacity={0.8} fill="url(#grad)" className="Chart" />
              <Tooltip/>
            </AreaChart>
          </ResponsiveContainer>
        );
        let errors = [];
        this.props.changeChart(data,Chart,type,errors, this.state.sortType);
      }else{
        this.props.changeChart([],(<div></div>),this.props.type,["Y Axis must be numerical values"], this.state.sortType);
      }
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
