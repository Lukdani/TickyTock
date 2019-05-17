import React from "react";

const Instructions = () => {
  return (
    <div className="instructions">
      <div className="instructionsContent">
        <h2>Instructions:</h2>
        <ol>
          <li>
            <span> Use the cursor to place an "X" or "O".</span>
          </li>
          <li>
            <span> 3 on a line wins a round.</span>
          </li>
          <li>
            <span> Play against robot or human.</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Instructions;
