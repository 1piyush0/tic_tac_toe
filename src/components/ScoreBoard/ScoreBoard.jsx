import React from 'react'
import './ScoreBoard.css'

const ScoreBoard = ({xScore,oScore,tieScore,playing}) => {
  return (
    <div className='scoreBoard'>
      <div className="forX" style={{ color:  'red' }}>
        <div>X</div>
        <div>Score - {xScore}</div>
      </div>
      <div className="forO" style={{ color: 'blue'}}>
        <div>O</div>
        <div>Score - {oScore}</div>
      </div>
    </div>
  )
}

export default ScoreBoard
