import React from 'react';
import {VictoryChart, VictoryBar,VictoryLine} from 'victory';
import {LineChart,Line} from 'recharts';

const origData = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

class ChartNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tableIdx: -1,
      xAxis: "",
      yAxis: "",
      chartDrawn: false,
      data: [],
      Chart: (<div></div>)
    };
    this.dataTableBar = this.dataTableBar.bind(this);
    this.DataTableChange = this.DataTableChange.bind(this);
    this.xAxisChange = this.xAxisChange.bind(this);
    this.yAxisChange = this.yAxisChange.bind(this);
    this.createChart = this.createChart.bind(this);
    this.Chart = (<div></div>);
  }

  componentDidMount(){
    this.props.fetchAllDataTables();
  }

  DataTableChange(e){
    console.log(e.target.value);
    this.setState({tableIdx: e.target.value});
  }

  xAxisChange(e){
    console.log(e.target.value);
    this.setState({xAxis: e.target.value});
  }

  yAxisChange(e){
    console.log(e.target.value);
    this.setState({yAxis: e.target.value});
  }

  createChart(e){
    let data = [];
    Object.values(this.props.dataTables[this.state.tableIdx].table).map((tablerow)=>
    {
      let row = {};
      Object.keys(tablerow).map((headings)=>{
        if(headings===this.state.xAxis){
          row["x"] = parseInt(tablerow[headings]);
        }else if(headings===this.state.yAxis){
          row["y"] = parseInt(tablerow[headings]);
        }

      });
      data.push(row);
    });
    console.log(data);
     this.setState({data: {data}});
    // this.setState({Chart: (
    //   <VictoryBar
    //     data={data} x={this.state.xAxis} y={this.state.yAxis} />
    // )});
    console.log(this.Chart);
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
        <select onChange={this.xAxisChange}>
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
        <select onChange={this.yAxisChange}>
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

  render(){
    console.log(this.props);
    let display;
    if(this.props.dataTables){
      display = (
        <div></div>
      );
    }
    console.log(this.state.data);
    console.log(origData==this.state.data);

    let newData = [];
    if(this.state.data.data){
      console.log(this.state.data.data.slice(0,7));
      console.log(newData[0]);
      console.log(typeof this.state.data.data[0]["minutes_remaining"] == 'number');
      newData = this.state.data.data.slice(0,7);
    }

    display = (<div></div>);
    if(this.state.data[0]){
      display=(
        <VictoryLine
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
          ]}
        />
      );
    }
    console.log(display);
    // console.log(this.state.data[0]["quarter"]===newData[0]["quarter"]);
    return(
      <div>
        {this.dataTableBar()}
        {this.xAxisBar()}
        {this.yAxisBar()}
        <button onClick={this.createChart}>Create Chart</button>
        <h1>h</h1>
          <VictoryBar
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={newData}
          />
      </div>
    );
  }
}

// <VictoryChart>
//   <VictoryBar
//     data={this.props.state.dataTables.table}
//     x="games" y="goals" />
// </VictoryChart>

export default ChartNew;
