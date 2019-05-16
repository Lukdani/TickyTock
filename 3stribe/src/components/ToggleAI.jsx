import React from "react";

const ToggleAI = props => {
  return (
    <h2
      id="toggleAi"
      style={props.props.players[1].aI ? { color: "green" } : { color: "red" }}
      onClick={props.handleClick}
    >
      {props.props.players[1].aI ? "Enable human" : "Enable robot"}
    </h2>
  );
};

export default ToggleAI;
