import React from "react";

const PopUp = ({ props, handleStartAgain }) => {
  return (
    <div className="popUp">
      <h1 id="gameOver">
        Game Over -{" "}
        {props.draw
          ? "It's a draw!"
          : props.players[0].turn
          ? "O wins!"
          : "X wins!"}{" "}
        <h2 id="startAgain" onClick={handleStartAgain}>
          New Round?{" "}
        </h2>
        {(props.gameMode === "Easy" && (
          <p>
            <i>Tip:</i> You played on easy mode. Maybe try a more dificult mode?
          </p>
        )) ||
          (props.gameMode === "Medium" && (
            <p>
              <i>Tip:</i> You played on medium mode. Maybe try a more dificult
              mode?
            </p>
          ))}
      </h1>
    </div>
  );
};

export default PopUp;
