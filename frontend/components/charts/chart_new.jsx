import React from 'react';

class ChartNew extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchOneDataTable(29);
  }

  render(){
    console.log(this.props);
    return(<div>
      <h1>hi</h1>
    </div>);
  }
}

export default ChartNew;
