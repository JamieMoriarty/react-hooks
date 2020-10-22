// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import { useLocalStorageState } from '../utils'

const initalSquaresValue = Array(9).fill(null)
function Board({ onSquaresUpdates, restart, squares }) {

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[square] = calculateNextValue(squares)

    onSquaresUpdates(squaresCopy)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{calculateStatus(calculateWinner(squares), squares, calculateNextValue(squares))}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  const [ history, setHistory ] = useLocalStorageState('history', [{ id: 0, squares: initalSquaresValue }])
  const [ activeBoard, setActiveBoard ] = useLocalStorageState('activeBoard', 0)

  const onSquaresUpdate = (squares) => {
    const updatedHistory = [...history.slice(0, activeBoard + 1), { id: history.length, squares }]

    setHistory(updatedHistory)
    setActiveBoard(activeBoard + 1)
  }

  const restart = () => {
    setActiveBoard(0)
    setHistory([{ id: 0, squares: initalSquaresValue }])
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history[activeBoard].squares} onSquaresUpdates={onSquaresUpdate} restart={restart}/>
      </div>
      <ol>
        {history.map((historicBoard, index) => (
          <li key={historicBoard.id}><button onClick={() => setActiveBoard(historicBoard.id)}>{`Board # ${index}`}</button></li>
        ))}
      </ol>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
