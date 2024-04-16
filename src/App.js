import { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import Modal from './components/Modal/Modal';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXPlaying, setIsXPlaying] = useState(true);
  const [xScore, setXScore] = useState(parseInt(localStorage.getItem('xScore')) || 0);
  const [oScore, setOScore] = useState(parseInt(localStorage.getItem('oScore')) || 0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const storedXScore = localStorage.getItem('xScore');
    const storedOScore = localStorage.getItem('oScore');

    if (storedXScore) setXScore(parseInt(storedXScore));
    if (storedOScore) setOScore(parseInt(storedOScore));
  }, []);

  useEffect(() => {
    localStorage.setItem('xScore', xScore.toString());
    localStorage.setItem('oScore', oScore.toString());
  }, [xScore, oScore]);

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBtnClick = (clickedBtnId) => {
    const updatedBoard = board.map((value, id) => {
      if (id === clickedBtnId) {
        return isXPlaying ? 'X' : 'O';
      } else {
        return value;
      }
    });
    setBoard(updatedBoard);
    setIsXPlaying(!isXPlaying);
    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === 'X') {
        setXScore(xScore + 1);
        setGameOver(true);
        reset('X');
      } else {
        setOScore(oScore + 1);
        setGameOver(true);
        reset('O');
      }
    }

    let allFilled = true;

    updatedBoard.forEach((item) => {
      if (item === null) {
        allFilled = false;
      }
    });

    if (allFilled && winner !== 'X' && winner !== 'O') {
      setGameOver(true);
      reset('tie');
    }
  };

  const checkWinner = (updatedBoard) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (
        updatedBoard[x] &&
        updatedBoard[x] === updatedBoard[y] &&
        updatedBoard[y] === updatedBoard[z]
      ) {
        return updatedBoard[x];
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const reset = (currentWinner) => {
    setModalMessage(currentWinner);
    setIsXPlaying(true);
    setTimeout(() => {
      setShowModal(true);
    }, 1200);
  };

  const [playAgainOrRestartClicked, setPlayAgainOrRestartClicked] = useState(false);

  const onPlayAgain = () => {
    setShowModal(false);
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setPlayAgainOrRestartClicked(true);
    setTimeout(() => {
      setPlayAgainOrRestartClicked(false);
    }, 500);
  };

  const onRestartGame = () => {
    setShowModal(false);
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setXScore(0);
    setOScore(0);
    setPlayAgainOrRestartClicked(true);
    setTimeout(() => {
      setPlayAgainOrRestartClicked(false);
    }, 500);
  };

  const nothing = () => {
    // nothing (just used to remove some runtime errors...)
  };

  return (
    <div className="main">
      <h1>Tic Tac Toe</h1>
      <ScoreBoard xScore={xScore} oScore={oScore} playing={isXPlaying} />
      <Board
        board={board}
        onClick={gameOver === true ? nothing : handleBtnClick}
        playing={isXPlaying}
        playAgainOrRestartClicked={playAgainOrRestartClicked}
        gameOver={gameOver}
      />
      {showModal && <Modal message={modalMessage} onPlayAgain={onPlayAgain} onRestartGame={onRestartGame} />}
    </div>
  );
}

export default App;
