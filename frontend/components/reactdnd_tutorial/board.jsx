import React from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './boardsquare';
import Knight from './knight';
// import {moveKnight, canMoveKnight} from './game';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {knightPosition: [0,0]};
    this.renderSquare = this.renderSquare.bind(this);
    this.renderPiece = this.renderPiece.bind(this);
    this.moveKnight = this.moveKnight.bind(this);
  }
  renderSquare(i){
    const x = i % 8;
    const y = Math.floor(i/8);
    const curpos = x===this.state.knightPosition[0] && y === this.state.knightPosition[1];
    return (
      <div key={i} style={{width: '12.5%', height: '12.5%'}}>
        <BoardSquare x={x} y={y} curpos={curpos} onDrop={(toX,toY)=>this.moveKnight(toX,toY)}>
          {this.renderPiece(x,y)}
        </BoardSquare>
      </div>
    );
  }

  moveKnight(toX, toY) {
    console.log('hiii');
    this.setState({knightPosition: [toX, toY]});
  }

  renderPiece(x,y){
    const [knightX, knightY] = this.state.knightPosition;
    console.log(this.state.knightPosition);
    if(x===knightX && y === knightY) {
      return <Knight pos="i am a knight" />;
    }
  }

  handleSquareClick(toX, toY){
    // if(canMoveKnight(toX, toY)){
      this.moveKnight(toX, toY);
    // }
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

};
