import React from "react";

const StartAgain = ({ props, handleStartAgain }) => {
  return (
    <h2
      id="startAgain"
      onClick={handleStartAgain}
      style={
        props.gameOver && props.players[1].turn
          ? { color: "red" }
          : { color: "black" }
      }
    >
      New Round?
    </h2>
  );
};

export default StartAgain;
