import React from "react";
import ToggleAI from "./ToggleAI";
import PointBoard from "./PointBoard";
import ResetScore from "./resetScore.jsx";
import StartAgain from "./StartAgain";

const ScoreBoard = ({ props, handleStartAgain, handleClick, handleReset }) => {
  return (
    <div className="scoreBoard">
      <PointBoard sign={props.players[0].sign} score={props.players[0].score} />
      <StartAgain props={props} handleStartAgain={handleStartAgain} />

      <ToggleAI props={props} handleClick={handleClick} />

      <ResetScore handleReset={handleReset} />

      <PointBoard sign={props.players[1].sign} score={props.players[1].score} />
    </div>
  );
};

export default ScoreBoard;
