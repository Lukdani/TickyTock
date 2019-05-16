import React from "react";

const ScoreBoard = props => {
  return (
    <p id="playerOneScore">
      {props.sign} - points: {props.score}
    </p>
  );
};

export default ScoreBoard;
