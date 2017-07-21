import React from 'react';
import {VictoryChart, VictoryBar,VictoryLine} from 'victory';
import {LineChart,Line} from 'recharts';

const ChartNewTest = ()=>{
  let newData = [
    {x: parseInt(7), y: parseInt(7)},
    {x: parseInt(8), y: parseInt(7)},
    {x: parseInt(9),y: parseInt(7)}
  ];
  return (
    <VictoryLine
    style={{
      data: { stroke: "#c43a31" },
      parent: { border: "1px solid #ccc"}
    }}
    data={newData}
    />
  );
};

export default ChartNewTest;
