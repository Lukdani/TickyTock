import React from "react";

const GameHeader = ({ props }) => {
  return (
    <div className="gameHeader">
      {props.gameOver ? (
        <h1 id="gameOver">
          Game Over -{" "}
          {props.draw
            ? "It's a draw!"
            : props.players[0].turn
            ? "O wins!"
            : "X wins!"}
        </h1>
      ) : (
        <h1 id="gameHeading">TickyTock :o)</h1>
      )}
    </div>
  );
};

export default GameHeader;
