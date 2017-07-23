import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Selections from './chart_selections';

class DataSelection extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props);
    this.headings = this.props.headings;
    let selectionStatus = [];
    if(!this.headings){
      this.headings = [];
    }else{
      for(let i = 0; i< this.headings.length; i++){
        selectionStatus.push(0);
      }
    }

    this.state = {
      ySelection: "",
      xSelection: "",
      selectionStatus
    };
  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
    if(this.headings != newProps.headings){
      this.headings = newProps.headings;
    }
  }

  render(){
    return (
      <div>
        {this.headings.map((heading, idx)=>
        <div key={idx} style={{width: '100px', height: '10px', backgroundColor: 'blue', margin: '10px'}}>
          <Selections heading={heading}/>
        </div>)}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DataSelection);
