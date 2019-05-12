import React, { Component } from "react";
import "./TickTock4.css";

/*
This is my first attempt to make a classic board game. I developed it without any help based on the immediate knowledge
I had gathered at the time. It was very challening that taught me a lot. I was great to experience that I could actually build this.

I've learned that programming really is problem solving. You should of course have a basic idea about how you will build the app, but
as you work on the app it will continually appear obvious to you what logic is needed. A lot of the logic in this app I never thought would be needed
and I had no idea I would actually be able to code it. 
So don't let it hold you back that you're not sure of how to develop the app: You'll learn this as you work on the project.

Later on, when I have developed my skills, I'll copy the code to a new project and make the improvements that I know is needed.
I think those improvements will consist in more modularity, less repetetive code by the use of functions and maybe some more direct ways
of determining game event (winning, draw etc.).

*/

class TickTock4 extends Component {
  constructor() {
    super();

    this.createArray = this.createArray.bind(this);
    this.createFields = this.createFields.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateScore = this.updateScore.bind();
    this.gameOver = this.gameOver.bind(this);
    this.startAgain = this.startAgain.bind(this);

    //saves state in a variable so that the variable later can be used to reset the game
    //imgSrc is not currently used and can be deleted from the objects
    this.initialState1 = {
      fields: [
        {
          id: 1,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 1,
          column: 1
        },
        {
          id: 2,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 1,
          column: 2
        },
        {
          id: 3,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 1,
          column: 3
        },
        {
          id: 4,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 1,
          column: 4
        },

        {
          id: 5,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 1
        },
        {
          id: 6,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 2
        },
        {
          id: 7,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 3
        },
        {
          id: 8,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 4
        },

        {
          id: 9,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 1
        },
        {
          id: 10,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 2
        },
        {
          id: 11,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 3
        },
        {
          id: 12,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 4
        },

        {
          id: 13,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 4,
          column: 1
        },
        {
          id: 14,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 4,
          column: 2
        },
        {
          id: 15,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 4,
          column: 3
        },
        {
          id: 16,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 4,
          column: 4
        }
      ],
      sign: "O",
      gameOver: false,
      players: [
        { name: "Player 1", score: 0, sign: "X", turn: true },
        { name: "Player Two", score: 0, sign: "O", turn: false }
      ]
    };

    this.state = this.initialState1;
  }

  //Creates array with HTML markup based on the field array in state.
  createArray = array => {
    const rowOfFields = array.map(field => {
      return (
        <div
          key={field.id}
          id={field.id}
          className="field4"
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleLeave}
          onClick={this.handleClick}
        >
          {field.imgSrc}
        </div>
      );
    });
    return rowOfFields;
  };

  //Contains the logic that shows the sign when hovering over a field.
  handleEnter = event => {
    const changeToO = () => {
      return (event.target.innerHTML = "O");
    };
    const changeToX = () => {
      return (event.target.innerHTML = "X");
    };
    const decideSign = () => {
      return this.state.sign === "X" ? changeToO() : changeToX();
    };

    const eventIndex = parseInt(event.target.id) - 1;
    this.state.fields[eventIndex].isClicked === false &&
      !this.state.gameOver &&
      decideSign();
  };

  //Makes sure that the sign dissapears when mouse leaves field - of course only if isClicked is set to false.
  handleLeave = event => {
    const eventIndex = parseInt(event.target.id) - 1;
    const backToSign = () => {
      event.target.innerHTML = "";
    };
    this.state.fields[eventIndex].isClicked === false && backToSign();
  };

  updateScore = () => {
    if (this.state.sign === "O") {
      let playerOne = this.state.players[0];
      let newScore = playerOne.score++;
      this.setState({ playerOne: newScore });
    } else if (this.state.sign === "X") {
      let playerOne = this.state.players[1];
      let newScore = playerOne.score++;
      this.setState({ playerOne: newScore });
    } else {
      console.log("An error occured.");
    }
  };

  // This is where a lot of the magic happens. Watch comments below.
  handleClick = event => {
    //gets index of field in array by substracting 1 from id (as arrays start on index 0)
    const eventIndex = parseInt(event.target.id) - 1;

    //saves current state value in a variable
    const clickedPropertyClicked = this.state.fields[eventIndex];

    //checks to see if isClicked of field is false and that value of gameOver is also false before executing code.
    if (
      clickedPropertyClicked.isClicked === false &&
      this.state.gameOver === false
    ) {
      //saves the relevant field in a variable for later use.
      const clickedPropertyClickedSrc = this.state.fields[eventIndex];

      //Sets value of isClicked of the relevant field to true - based on the variable above.
      clickedPropertyClicked.isClicked = true;

      //this.state.fields[eventIndex].isClicked === true && this.setState(clickedPropertyClicked)
      //ghosted on 12th of april. Delete on 14th of april if app is still working.

      //Toggles this.state.sign based on whether or not its currently the same as players 1's.
      this.state.sign === this.state.players[0].sign
        ? this.setState({ sign: "O" })
        : this.setState({ sign: "X" });
      clickedPropertyClickedSrc.fieldSign = this.state.sign === "X" ? "O" : "X";

      //this.setState(clickedPropertyClickedSrc)
      //Ghosted on 12th of april. Delete code on 14th of april if app is stilling working.

      const playerOne = this.state.players[0];
      const playerTwo = this.state.players[1];

      if (playerOne.turn === true) {
        playerOne.turn = false;
        playerTwo.turn = true;
      } else {
        playerOne.turn = true;
        playerTwo.turn = false;
      }
      console.log(this.state);
      this.setState({ playerOne });
      this.setState({ playerTwo });

      this.gameOver(event);
    } else if (
      clickedPropertyClicked.isClicked === true &&
      this.state.gameOver === true
    ) {
      console.log(
        "It has already been clicked - and the round is already over anyway."
      );
    } else if (clickedPropertyClicked.isClicked === true) {
      console.log("It has already been clicked.");
    } else if (this.state.gameOver === true) {
      console.log("The round is already over.");
    }
  };

  gameOver = event => {
    //creates variable names for fields to check
    const eventIndex = event.target.id - 1;

    // row variables
    const currentField = this.state.fields[eventIndex];
    const fieldPlusOne = this.state.fields[eventIndex + 1];
    const fieldPlusTwo = this.state.fields[eventIndex + 2];
    const fieldSubOne = this.state.fields[eventIndex - 1];
    const fieldSubTwo = this.state.fields[eventIndex - 2];

    //column variables

    const fieldPlusFour = this.state.fields[eventIndex + 4];
    const fieldPlusEight = this.state.fields[eventIndex + 8];
    const fieldSubFour = this.state.fields[eventIndex - 4];
    const fieldSubEight = this.state.fields[eventIndex - 8];

    //mixed line variables

    const fieldPlusFive = this.state.fields[eventIndex + 5];
    const fieldPlusTen = this.state.fields[eventIndex + 10];
    const fieldSubFive = this.state.fields[eventIndex - 5];
    const fieldSubTen = this.state.fields[eventIndex - 10];

    const fieldPlusThree = this.state.fields[eventIndex + 3];
    const fieldPlusSix = this.state.fields[eventIndex + 6];
    const fieldSubThree = this.state.fields[eventIndex - 3];
    const fieldSubSix = this.state.fields[eventIndex - 6];

    if (
      this.state.fields[0].isClicked &&
      this.state.fields[1].isClicked &&
      this.state.fields[2].isClicked &&
      this.state.fields[3].isClicked &&
      this.state.fields[4].isClicked &&
      this.state.fields[5].isClicked &&
      this.state.fields[6].isClicked &&
      this.state.fields[7].isClicked &&
      this.state.fields[8].isClicked &&
      this.state.fields[9].isClicked &&
      this.state.fields[10].isClicked &&
      this.state.fields[11].isClicked &&
      this.state.fields[12].isClicked &&
      this.state.fields[13].isClicked &&
      this.state.fields[14].isClicked &&
      this.state.fields[15].isClicked
    ) {
      this.setState({ gameOver: true });
    }

    if (
      fieldPlusOne !== undefined &&
      fieldPlusOne.fieldSign === currentField.fieldSign &&
      fieldPlusOne.row === currentField.row &&
      fieldPlusTwo !== undefined &&
      fieldPlusTwo.fieldSign === currentField.fieldSign &&
      fieldPlusTwo.row === currentField.row
    ) {
      this.updateScore();
      console.log(currentField.row + 1);
    } else if (
      fieldPlusOne !== undefined &&
      fieldPlusOne.fieldSign === currentField.fieldSign &&
      fieldPlusOne.row === currentField.row &&
      fieldSubOne !== undefined &&
      fieldSubOne.fieldSign === currentField.fieldSign &&
      fieldSubOne.row === currentField.row
    ) {
      this.updateScore();
    } else if (
      fieldSubOne !== undefined &&
      fieldSubOne.fieldSign === currentField.fieldSign &&
      fieldSubOne.row === currentField.row &&
      fieldSubTwo !== undefined &&
      fieldSubTwo.fieldSign === currentField.fieldSign &&
      fieldSubTwo.row === currentField.row
    ) {
      this.updateScore();
    }

    //logic for setting game to over when 3 in column:

    if (
      fieldPlusFour !== undefined &&
      fieldPlusFour.fieldSign === currentField.fieldSign &&
      fieldPlusFour.column === currentField.column &&
      fieldPlusEight !== undefined &&
      fieldPlusEight.fieldSign === currentField.fieldSign &&
      fieldPlusEight.column === currentField.column
    ) {
      this.updateScore();
    } else if (
      fieldPlusFour !== undefined &&
      fieldPlusFour.fieldSign === currentField.fieldSign &&
      fieldPlusFour.column === currentField.column &&
      fieldSubFour !== undefined &&
      fieldSubFour.fieldSign === currentField.fieldSign &&
      fieldSubFour.column === currentField.column
    ) {
      this.updateScore();
    } else if (
      fieldSubFour !== undefined &&
      fieldSubFour.fieldSign === currentField.fieldSign &&
      fieldSubFour.column === currentField.column &&
      fieldSubEight !== undefined &&
      fieldSubEight.fieldSign === currentField.fieldSign &&
      fieldSubEight.column === currentField.column
    ) {
      this.updateScore();
    }

    //logic for setting game to over when 3 in a mixed line:

    if (
      fieldPlusFive !== undefined &&
      fieldPlusFive.fieldSign === currentField.fieldSign &&
      fieldPlusFive.column === currentField.column + 1 &&
      fieldPlusFive.row === currentField.row + 1 &&
      fieldPlusTen !== undefined &&
      fieldPlusTen.fieldSign === currentField.fieldSign &&
      fieldPlusTen.column === currentField.column + 2 &&
      fieldPlusTen.row === currentField.row + 2
    ) {
      this.updateScore();
    } else if (
      fieldPlusFive !== undefined &&
      fieldPlusFive.fieldSign === currentField.fieldSign &&
      fieldPlusFive.column === currentField.column + 1 &&
      fieldPlusFive.row === currentField.row + 1 &&
      fieldSubFive !== undefined &&
      fieldSubFive.fieldSign === currentField.fieldSign &&
      fieldSubFive.column === currentField.column - 1 &&
      fieldSubFive.row === currentField.row - 1
    ) {
      this.updateScore();
    } else if (
      fieldSubTen !== undefined &&
      fieldSubTen.fieldSign === currentField.fieldSign &&
      fieldSubTen.column === currentField.column - 2 &&
      fieldSubTen.row === currentField.row - 2 &&
      fieldSubFive !== undefined &&
      fieldSubFive.fieldSign === currentField.fieldSign &&
      fieldSubFive.column === currentField.column - 1 &&
      fieldSubFive.row === currentField.row - 1
    ) {
      this.updateScore();
    }

    // other way

    if (
      fieldPlusThree !== undefined &&
      fieldPlusThree.fieldSign === currentField.fieldSign &&
      fieldPlusThree.column === currentField.column - 1 &&
      fieldPlusThree.row === currentField.row + 1 &&
      fieldPlusSix !== undefined &&
      fieldPlusSix.fieldSign === currentField.fieldSign &&
      fieldPlusSix.column === currentField.column - 2 &&
      fieldPlusSix.row === currentField.row + 2
    ) {
      this.updateScore();
    } else if (
      fieldPlusThree !== undefined &&
      fieldPlusThree.fieldSign === currentField.fieldSign &&
      fieldPlusThree.column === currentField.column - 1 &&
      fieldPlusThree.row === currentField.row + 1 &&
      fieldSubThree !== undefined &&
      fieldSubThree.fieldSign === currentField.fieldSign &&
      fieldSubThree.column === currentField.column + 1 &&
      fieldSubThree.row === currentField.row - 1
    ) {
      this.updateScore();
    } else if (
      fieldSubThree !== undefined &&
      fieldSubThree.fieldSign === currentField.fieldSign &&
      fieldSubThree.column === currentField.column + 1 &&
      fieldSubThree.row === currentField.row - 1 &&
      fieldSubSix !== undefined &&
      fieldSubSix.fieldSign === currentField.fieldSign &&
      fieldSubSix.column === currentField.column + 2 &&
      fieldSubSix.row === currentField.row - 2
    ) {
      this.updateScore();
    }
  };

  startAgain = () => {
    const initialState = {
      fields: [
        {
          id: 1,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 1,
          column: 1
        },
        {
          id: 2,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 1,
          column: 2
        },
        {
          id: 3,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 1,
          column: 3
        },
        {
          id: 4,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 1,
          column: 4
        },

        {
          id: 5,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 1
        },
        {
          id: 6,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 2
        },
        {
          id: 7,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 3
        },
        {
          id: 8,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 4
        },

        {
          id: 9,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 1
        },
        {
          id: 10,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 2
        },
        {
          id: 11,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 3
        },
        {
          id: 12,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 4
        },

        {
          id: 13,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 4,
          column: 1
        },
        {
          id: 14,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 4,
          column: 2
        },
        {
          id: 15,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 4,
          column: 3
        },
        {
          id: 16,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 4,
          column: 4
        }
      ],
      sign: "O",
      gameOver: false
    };
    this.setState(initialState);
    console.log(this.state);
    const fieldElements = document.getElementsByClassName("field4");
    Array.prototype.forEach.call(fieldElements, function(element) {
      element.innerHTML = "";
    });
  };

  resetScore = () => {
    const playerFields = {
      players: [
        { name: "Player 1", score: 0, sign: "X", turn: true },
        { name: "Player Two", score: 0, sign: "O", turn: false }
      ]
    };
    this.setState(playerFields);
  };

  createFields = array => {
    return (
      <div className="gameContainerTock4">
        {this.createArray(this.state.fields)}
      </div>
    );
  };

  render() {
    return (
      <div className="content">
        <header className="3 På Stribe" />
        <div className="gameHeader">
          {this.state.gameOver ? (
            <h1 id="gameOver">Game Over</h1>
          ) : (
            <h1 id="gameHeading">TickyTock :o)</h1>
          )}
        </div>
        <div className="instructions">
          <ol>
            <li>Place an "X" or "O".</li>
            <li>3 on a line wins a point.</li>
            <li>Most points in a round wins the round.</li>
          </ol>
        </div>
        <div className="scoreBoard">
          <p id="playerOneScore">X - points {this.state.players[0].score}</p>
          <h2
            id="startAgain"
            onClick={this.startAgain}
            style={this.state.gameOver ? { color: "red" } : { color: "black" }}
          >
            New Round?
          </h2>
          <h2 id="resetScore" onClick={this.resetScore}>
            Reset Score?
          </h2>
          <p id="playerTwoScore">O - points: {this.state.players[1].score}</p>
        </div>
        <div>{this.createFields(this.createArray(this.state.fields))}</div>
      </div>
    );
  }
}

export default TickTock4;
