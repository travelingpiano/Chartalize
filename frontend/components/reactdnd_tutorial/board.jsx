import React from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './boardsquare';
import Knight from './knight';
import {moveKnight, canMoveKnight} from './game';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends React.Component{
  renderSquare(i){
    const x = i % 8;
    const y = Math.floor(i/8);
    return (
      <div key={i} style={{width: '12.5%', height: '12.5%'}}
        onClick={()=> this.handleSquareClick(x,y)}>
        <BoardSquare x={x} y={y}>
          {this.renderPiece(x,y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x,y){
    const [knightX, knightY] = this.props.knightPosition;
    if(x===knightX && y === knightY) {
      return <Knight pos="i am a knight" />;
    }
  }

  handleSquareClick(toX, toY){
    if(canMoveKnight(toX, toY)){
      moveKnight(toX, toY);
    }
  }

  render() {
    const squares = [];
    for(let i = 0; i< 64; i++){
      squares.push(this.renderSquare(i));
    }
    return (
      <div style={{width: '500px',
      height: '500px', display: 'flex', flexWrap: 'wrap'}}>
        {squares}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};
