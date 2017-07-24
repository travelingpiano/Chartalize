import React from 'react';
import {DragSource} from 'react-dnd';

const selectionsSource = {
  beginDrag(props){
    return {};
  },

  endDrag(props,monitor){
    if(monitor.getDropResult()){
      let axisName = monitor.getDropResult().axisName;
      props.changeSelection(props.heading,axisName);
    }
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
      <div className="AxisSelection">
        {heading}
      </div>
    );
  }
}

export default DragSource("HEADING", selectionsSource, collect)(Selections);
