import React from "react";
import PopUp from "./PopUp";

const CreateBoard = ({ props, createFields, createArray, startAgain }) => {
  return (
    <div className="board-wrapper">
      {createFields(createArray(props.fields))}
      {props.gameOver && <PopUp props={props} handleStartAgain={startAgain} />};
    </div>
  );
};

export default CreateBoard;
