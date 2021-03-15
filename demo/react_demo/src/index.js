import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     render() {
//       return (
//         <button 
//             className="square" 
//             onClick={() => this.props.onClick()} >
//             {/* 表示所传递过来的数值 */}
//           {this.props.value}
//         </button>
//       );
//     }
//   }
  function calculateWinner(squares) { //判断胜者是谁，返回 X 或者 O
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function Square(props){
    return (
        <button className="square" onClick={props.onClick} >
            {props.value}
        </button>
    );
  }

  class Board extends React.Component {
    // 将 Board 组件的初始状态设置为长度为 9 的空值数组
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext:true,
    //     };
    // }

    renderSquare(i) { //函数组件，返回方块
      return (
            <Square 
                value={this.props.squares[i]}
                onClick = {() => this.props.onClick(i)}
            />
        );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history : [{
          squares: Array(9).fill(null),
        }],
        xIsNext:true,
        stepNumber:0,
      };
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length-1];
      const squares = current.squares.slice(); //每一次点击都会创建 squares 数组的副本，让this.state.squares变为不可变对象
      
      // 如果出现了胜者或者点击的方块被填充了则不做任何处理直接返回
      if(calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';   //根据xIsNext的bool值来决定下哪个棋子
      this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          xIsNext:!this.state.xIsNext,
          stepNumber: history.length,
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber:step,
        xIsNext:(step % 2) === 0, 
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner  = calculateWinner(current.squares);

      const moves = history.map((step,move) => {
        const desc = move ? 
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });


      let status;
      if(winner){
        status = "Winner: " + winner;
      }else{
        status = 'Next player: '+(this.state.xIsNext?'X':'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  