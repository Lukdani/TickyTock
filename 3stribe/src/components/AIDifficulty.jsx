import React from "react";

const AIDifficulty = props => {
  return (
    <div className="aIDifficulty">
      {props.props.players[1].aI && (
        <div>
          <p
            style={
              props.props.gameMode === "Easy"
                ? { color: "green", fontWeight: "bold" }
                : { color: "black" }
            }
            onClick={() => props.handleChange("Easy")}
          >
            Easy
          </p>
          <p
            style={
              props.props.gameMode === "Medium"
                ? { color: "green", fontWeight: "bold" }
                : { color: "black" }
            }
            onClick={() => props.handleChange("Medium")}
          >
            Medium
          </p>
          <p
            style={
              props.props.gameMode === "Hard"
                ? { color: "green", fontWeight: "bold" }
                : { color: "black" }
            }
            onClick={() => props.handleChange("Hard")}
          >
            Hard
          </p>
        </div>
      )}
    </div>
  );
};

export default AIDifficulty;
