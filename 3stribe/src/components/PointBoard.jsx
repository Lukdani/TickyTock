import React from "react";

const PointBoard = props => {
  return (
    <p id="playerOneScore">
      {props.sign} - points: {props.score}
    </p>
  );
};

export default PointBoard;
