import React from 'react';
import {DragSource} from 'react-dnd';

const selectionsSource = {
  beginDrag(props){
    return {};
  }
};

function collect(connect,monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Selections extends React.Component{
  render(){
    const {connectDragSource, isDragging, heading} = this.props;
    return connectDragSource(
      <div style={{width: 'inherit', height: 'inherit', color: 'white'}}>
        {heading}
      </div>
    );
  }
}

export default DragSource("HEADING", selectionsSource, collect)(Selections);
