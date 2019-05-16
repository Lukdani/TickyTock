import React from "react";

const ResetScore = props => {
  return (
    <h2 id="resetScore" onClick={props.handleReset}>
      Reset Score?{" "}
    </h2>
  );
};

export default ResetScore;
