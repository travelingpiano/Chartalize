import React from 'react';
import {LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter} from 'recharts';

const origData = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const rechartsdata = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class ChartNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tableIdx: -1,
      xAxis: "",
      yAxis: "",
      data: [],
      Chart: (<div></div>),
      title: ""
    };
    this.dataTableBar = this.dataTableBar.bind(this);
    this.DataTableChange = this.DataTableChange.bind(this);
    this.xAxisChange = this.xAxisChange.bind(this);
    this.yAxisChange = this.yAxisChange.bind(this);
    this.createLineChart = this.createLineChart.bind(this);
    this.createBarChart = this.createBarChart.bind(this);
    this.createScatterChart = this.createScatterChart.bind(this);
    this.createPieChart = this.createBarChart.bind(this);
    this.parseData = this.parseData.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.Chart = (<div></div>);
  }

  componentDidMount(){
    this.props.fetchAllDataTables();
  }

  DataTableChange(e){
    this.setState({tableIdx: e.target.value});
  }

  xAxisChange(e){
    this.setState({xAxis: e.target.value});
  }

  yAxisChange(e){
    this.setState({yAxis: e.target.value});
  }

  changeTitle(e){
    this.setState({title: e.target.value});
  }

  parseData(){
    let data = [];
    Object.values(this.props.dataTables[this.state.tableIdx].table).map((tablerow)=>
    {
      let row = {};
      Object.keys(tablerow).map((headings)=>{
        if(headings===this.state.xAxis){
          row[headings] = parseInt(tablerow[headings]);
        }else if(headings===this.state.yAxis){
          row[headings] = parseInt(tablerow[headings]);
        }

      });
      data.push(row);
    });
    return data;
  }

  createLineChart(e){
    let data = this.parseData();
    let Chart = (
      <LineChart width={600} height={300} data={data}
            className="PreviewChart">
         <XAxis dataKey={this.state.xAxis}/>
         <YAxis />
         <Tooltip/>
         <Legend />
         <Line type="monotone" dataKey={this.state.yAxis} stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
    );
     this.setState({data, Chart});
  }

  createBarChart(e){
    let data = this.parseData();
    let Chart = (
      <BarChart width={600} height={300} data={data}
            className="PreviewChart">
         <XAxis dataKey={this.state.xAxis}/>
         <YAxis />
         <Tooltip/>
         <Legend />
         <Bar type="monotone" dataKey={this.state.yAxis} fill="#8884d8"/>
      </BarChart>
    );
     this.setState({data, Chart});
  }

  createScatterChart(e){
    let data = this.parseData();
    let Chart = (
      <ScatterChart width={600} height={300}
            className="PreviewChart">
         <XAxis dataKey={this.state.xAxis}/>
         <YAxis dataKey={this.state.yAxis}/>
         <Tooltip/>
         <Legend />
         <Scatter type="monotone" data={data} fill="#8884d8"/>
      </ScatterChart>
    );
     this.setState({data, Chart});
  }

  createPieChart(){
    let data = this.parseData();
    let Chart = (
      <PieChart width={800} height={400}>
      <Pie isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
      <Tooltip/>
     </PieChart>
    );
    this.setState({data,Chart});
  }

  dataTableBar(){
    return (
      <div className="col-4">
        <select onChange={this.DataTableChange}>
          <option selected disabled>Choose a Data Table</option>
          {this.props.dataTables.map((dataTable,idx)=>
          <option key={idx} value={idx}>
            {dataTable.title}
          </option>)}
        </select>
      </div>
    );
  }

  xAxisBar(){
    let display;
    if(this.state.tableIdx===-1){
      display = (
        <select onChange={this.xAxisChange}>
          <option selected disabled>Choose an X Axis</option>
        </select>
      );
    }else{
      display = (
        <select onChange={this.xAxisChange} className="Chart-Dropdown">
          <option selected disabled>Choose an X Axis</option>
          {Object.keys(this.props.dataTables[this.state.tableIdx].table[0]).map((heading)=>
          <option key={heading} value={heading}>
            {heading}
          </option>)}
        </select>
      );
    }
    return display;
  }

  yAxisBar(){
    let display;
    if(this.state.tableIdx===-1){
      display = (
        <select onChange={this.yAxisChange}>
          <option selected disabled>Choose a Y Axis</option>
        </select>
      );
    }else{
      display = (
        <select onChange={this.yAxisChange} className="Chart-Dropdown">
          <option selected disabled>Choose an Y Axis</option>
          {Object.keys(this.props.dataTables[this.state.tableIdx].table[0]).map((heading)=>
          <option key={heading} value={heading}>
            {heading}
          </option>)}
        </select>
      );
    }
    return display;
  }

  render(){
    let display;
    if(this.props.dataTables){
      display = (
        <div></div>
      );
    }
    let newData = [];
    if(this.state.data[0]){
      newData = this.state.data;
    }

    display = (<div></div>);
    if(this.state.data[0]){
      display=(
        <div></div>
      );
    }

    return(
      <div className="ChartForm">
        <div className="Chart-Selections">
          {this.dataTableBar()}
          <label>X Axis</label>
          {this.xAxisBar()}
          <label>Y Axis</label>
          {this.yAxisBar()}
          <button onClick={this.createLineChart}>Create Line Chart</button>
          <button onClick={this.createBarChart}>Create Bar Chart</button>
          <button onClick={this.createScatterChart}>Create Scatter Chart</button>
          <button onClick={this.createPieChart}>Create Pie Chart</button>
        </div>
        <div className="Chart">
          <input onChange={this.changeTitle} placeholder="Title"></input>
          {this.state.Chart}
        </div>

      </div>
    );
  }
}

export default ChartNew;
