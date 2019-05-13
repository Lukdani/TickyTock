import React, { Component } from "react";
import "./TickTock3.css";

class TickTock3 extends Component {
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
    this.resetScore = this.resetScore.bind(this);
    this.changePlayer = this.changePlayer.bind(this);
    this.toggleSign = this.toggleSign.bind(this);
    this.toggleAi = this.toggleAi.bind(this);
    this.counterOpponent = this.counterOpponent.bind(this);

    //saves state in a variable so that the variable later can be used to reset the game
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
          row: 2,
          column: 1
        },
        {
          id: 5,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 2
        },
        {
          id: 6,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 3
        },

        {
          id: 7,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 1
        },
        {
          id: 8,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 2
        },
        {
          id: 9,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 3
        }
      ],
      gameOver: false,
      draw: false,
      players: [
        {
          name: "Player One",
          score: 0,
          sign: "X",
          turn: true,
          moves: 0
        },
        {
          name: "Player Two",
          score: 0,
          sign: "O",
          turn: false,
          moves: 0,
          aI: true
        } //aI is always set to player two. May be changed in the future
      ],
      firstPick: "X"
    };

    this.state = this.initialState1;
  }

  //so computerPick() runs - conditionally - every time state changes
  componentDidUpdate() {
    if (
      this.state.players[1].aI === true &&
      this.state.players[1].turn === true &&
      !this.state.gameOver
    ) {
      {
        //I made a minor setTimeout to give a more realistic playing experience
        setTimeout(() => {
          this.computerPick();
        }, 200);
      }
    }
  }
  //Creates array with HTML markup based on the field array in state.
  createArray = array => {
    const rowOfFields = array.map(field => {
      return (
        <div
          key={field.id}
          id={field.id}
          className={"field" + " " + "field" + field.id}
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleLeave}
          onClick={this.handleClick}
        >
          {field.fieldSign}
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
      return this.state.players[1].turn ? changeToO() : changeToX();
    };

    const eventIndex = parseInt(event.target.id) - 1;
    if (
      this.state.fields[eventIndex].isClicked === false &&
      !this.state.gameOver &&
      (this.state.players[0].turn === true ||
        this.state.players[1].aI === false)
    ) {
      decideSign();
    }
  };

  //Makes sure that the sign dissapears when mouse leaves field - of course only if isClicked is set to false.
  handleLeave = event => {
    const eventIndex = parseInt(event.target.id) - 1;
    const backToSign = () => {
      event.target.innerHTML = "";
    };
    this.state.fields[eventIndex].isClicked === false && backToSign();
  };

  toggleAi = () => {
    const playerTwo = this.state.players[1];
    playerTwo.aI === true ? (playerTwo.aI = false) : (playerTwo.aI = true);
    this.setState({ playerTwo });
    this.startAgain();
    this.resetScore();
  };

  updateScore = () => {
    let playerOne = this.state.players[0];
    let playerTwo = this.state.players[1];
    if (playerOne.turn) {
      playerTwo.score++;
      this.setState({ playerTwo });
    } else {
      playerOne.score++;
      this.setState({ playerOne });
    }
  };

  toggleSign = clickedField => {
    let playerOne = this.state.players[0];
    let playerTwo = this.state.players[1];
    clickedField.fieldSign = playerOne.turn ? playerTwo.sign : playerOne.sign;
    playerOne.turn ? playerTwo.moves++ : playerOne.moves++;
    this.setState({ clickedField });
    this.setState({ playerOne, playerTwo });
  };

  changePlayer = () => {
    const playerOne = this.state.players[0];
    const playerTwo = this.state.players[1];

    if (playerOne.turn === true) {
      playerOne.turn = false;
      playerTwo.turn = true;
    } else {
      playerOne.turn = true;
      playerTwo.turn = false;
    }
    this.setState({ playerOne });
    this.setState({ playerTwo });
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
      this.state.gameOver === false &&
      (this.state.players[1].aI === false ||
        this.state.players[0].turn === true)
    ) {
      //saves the relevant field in a variable for later use.
      const clickedPropertyClickedSrc = this.state.fields[eventIndex];

      //Sets value of isClicked of the relevant field to true - based on the variable above.
      clickedPropertyClicked.isClicked = true;
      this.changePlayer();
      //Toggles this.state.sign based on whether or not its currently the same as players 1's.
      this.toggleSign(clickedPropertyClickedSrc);

      this.gameOver(event.target);
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

  counterOpponent = field => {
    const opponentSign = this.state.players[0].sign;
    const aISign = this.state.players[1].sign;
    const currentField = this.state.fields[field.id - 1];
    const currentFieldIndex = currentField.id - 1;
    const fieldPlusOne = this.state.fields[currentFieldIndex + 1];
    const fieldPlusTwo = this.state.fields[currentFieldIndex + 2]; //also used in mixed line
    const fieldSubOne = this.state.fields[currentFieldIndex - 1];
    const fieldSubTwo = this.state.fields[currentFieldIndex - 2];

    //column variables

    const fieldPlusThree = this.state.fields[currentFieldIndex + 3];
    const fieldPlusSix = this.state.fields[currentFieldIndex + 6];
    const fieldSubThree = this.state.fields[currentFieldIndex - 3];
    const fieldSubSix = this.state.fields[currentFieldIndex - 6];

    //mixed line variables

    const fieldPlusFour = this.state.fields[currentFieldIndex + 4]; //also used in mixed line
    const fieldPlusEight = this.state.fields[currentFieldIndex + 8];
    const fieldSubFour = this.state.fields[currentFieldIndex - 4];
    const fieldSubEight = this.state.fields[currentFieldIndex - 8];

    if (
      //checks for opportunies to win game by pure row
      (field.isClicked === false &&
        fieldPlusOne !== undefined &&
        fieldPlusOne.fieldSign === aISign &&
        fieldPlusOne.row === field.row &&
        fieldPlusTwo !== undefined &&
        fieldPlusTwo.fieldSign === aISign &&
        fieldPlusTwo.row === field.row) ||
      (field.isClicked === false &&
        fieldPlusOne !== undefined &&
        fieldPlusOne.fieldSign === aISign &&
        fieldPlusOne.row === field.row &&
        fieldSubOne !== undefined &&
        fieldSubOne.fieldSign === aISign &&
        fieldSubOne.row === field.row) ||
      (field.isClicked === false &&
        fieldSubOne !== undefined &&
        fieldSubOne.fieldSign === aISign &&
        fieldSubOne.row === field.row &&
        fieldSubTwo !== undefined &&
        fieldSubTwo.fieldSign === aISign &&
        fieldSubTwo.row === field.row) ||
      //checks for opportunies to win game by pure collumn

      (field.isClicked === false &&
        fieldPlusThree !== undefined &&
        fieldPlusThree.fieldSign === aISign &&
        fieldPlusThree.column === field.column &&
        fieldPlusSix !== undefined &&
        fieldPlusSix.fieldSign === aISign &&
        fieldPlusSix.column === field.column) ||
      (field.isClicked === false &&
        fieldPlusThree !== undefined &&
        fieldPlusThree.fieldSign === aISign &&
        fieldPlusThree.column === field.column &&
        fieldSubThree !== undefined &&
        fieldSubThree.fieldSign === aISign &&
        fieldSubThree.column === field.column) ||
      (field.isClicked === false &&
        fieldSubThree !== undefined &&
        fieldSubThree.fieldSign === aISign &&
        fieldSubThree.column === field.column &&
        fieldSubSix !== undefined &&
        fieldSubSix.fieldSign === aISign &&
        fieldSubSix.column === field.column) ||
      //checks for opportunies to win game by mixed line

      (field.isClicked === false &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === aISign &&
        fieldPlusFour.column === field.column + 1 &&
        fieldPlusFour.row === field.row + 1 &&
        fieldPlusEight !== undefined &&
        fieldPlusEight.fieldSign === aISign &&
        fieldPlusEight.column === field.column + 2 &&
        fieldPlusEight.row === field.row + 2) ||
      (field.isClicked === false &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === aISign &&
        fieldPlusFour.column === field.column + 1 &&
        fieldPlusFour.row === field.row + 1 &&
        fieldPlusEight !== undefined &&
        fieldPlusEight.fieldSign === aISign &&
        fieldPlusEight.column === field.column + 2 &&
        fieldPlusEight.row === field.row + 2) ||
      (field.isClicked === false &&
        fieldSubEight !== undefined &&
        fieldSubEight.fieldSign === aISign &&
        fieldSubEight.column === field.column - 2 &&
        fieldSubEight.row === field.row - 2 &&
        fieldSubFour !== undefined &&
        fieldSubFour.fieldSign === aISign &&
        fieldSubFour.column === field.column - 1 &&
        fieldSubFour.row === field.row - 1) ||
      (field.isClicked === false &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === aISign &&
        fieldPlusFour.column === field.column + 1 &&
        fieldPlusFour.row === field.row + 1 &&
        fieldPlusEight !== undefined &&
        fieldPlusEight.fieldSign === aISign &&
        fieldPlusEight.column === field.column + 2 &&
        fieldPlusEight.row === field.row + 2) ||
      (field.isClicked === false &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === aISign &&
        fieldPlusFour.column === field.column + 1 &&
        fieldPlusFour.row === field.row + 1 &&
        fieldSubFour !== undefined &&
        fieldSubFour.fieldSign === aISign &&
        fieldSubFour.column === field.column - 1 &&
        fieldSubFour.row === field.row - 1) ||
      (field.isClicked === false &&
        fieldPlusTwo !== undefined &&
        fieldPlusTwo.fieldSign === aISign &&
        fieldPlusTwo.column === field.column - 1 &&
        fieldPlusTwo.row === field.row + 1 &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === aISign &&
        fieldPlusFour.column === field.column - 2 &&
        fieldPlusFour.row === field.row + 2) ||
      (field.isClicked === false &&
        fieldPlusTwo !== undefined &&
        fieldPlusTwo.fieldSign === aISign &&
        fieldPlusTwo.column === field.column - 1 &&
        fieldPlusTwo.row === field.row + 1 &&
        fieldSubTwo !== undefined &&
        fieldSubTwo.fieldSign === aISign &&
        fieldSubTwo.column === field.column + 1 &&
        fieldSubTwo.row === field.row - 1) ||
      (field.isClicked === false &&
        fieldSubTwo !== undefined &&
        fieldSubTwo.fieldSign === aISign &&
        fieldSubTwo.column === field.column + 1 &&
        fieldSubTwo.row === field.row - 1 &&
        fieldSubFour !== undefined &&
        fieldSubFour.fieldSign === aISign &&
        fieldSubFour.column === field.column + 2 &&
        fieldSubFour.row === field.row - 2)
    ) {
      return field;
    } else if (
      (field.isClicked === false &&
        fieldPlusOne !== undefined &&
        fieldPlusOne.fieldSign === opponentSign &&
        fieldPlusOne.row === field.row &&
        fieldPlusTwo !== undefined &&
        fieldPlusTwo.fieldSign === opponentSign &&
        fieldPlusTwo.row === field.row) ||
      (field.isClicked === false &&
        fieldPlusOne !== undefined &&
        fieldPlusOne.fieldSign === opponentSign &&
        fieldPlusOne.row === field.row &&
        fieldSubOne !== undefined &&
        fieldSubOne.fieldSign === opponentSign &&
        fieldSubOne.row === field.row) ||
      (field.isClicked === false &&
        fieldSubOne !== undefined &&
        fieldSubOne.fieldSign === opponentSign &&
        fieldSubOne.row === field.row &&
        fieldSubTwo !== undefined &&
        fieldSubTwo.fieldSign === opponentSign &&
        fieldSubTwo.row === field.row) ||
      (field.isClicked === false &&
        fieldPlusThree !== undefined &&
        fieldPlusThree.fieldSign === opponentSign &&
        fieldPlusThree.column === field.column &&
        fieldPlusSix !== undefined &&
        fieldPlusSix.fieldSign === opponentSign &&
        fieldPlusSix.column === field.column) ||
      (field.isClicked === false &&
        fieldPlusThree !== undefined &&
        fieldPlusThree.fieldSign === opponentSign &&
        fieldPlusThree.column === field.column &&
        fieldSubThree !== undefined &&
        fieldSubThree.fieldSign === opponentSign &&
        fieldSubThree.column === field.column) ||
      (field.isClicked === false &&
        fieldSubThree !== undefined &&
        fieldSubThree.fieldSign === opponentSign &&
        fieldSubThree.column === field.column &&
        fieldSubSix !== undefined &&
        fieldSubSix.fieldSign === opponentSign &&
        fieldSubSix.column === field.column) ||
      (field.isClicked === false &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === opponentSign &&
        fieldPlusFour.column === field.column + 1 &&
        fieldPlusFour.row === field.row + 1 &&
        fieldPlusEight !== undefined &&
        fieldPlusEight.fieldSign === opponentSign &&
        fieldPlusEight.column === field.column + 2 &&
        fieldPlusEight.row === field.row + 2) ||
      (field.isClicked === false &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === opponentSign &&
        fieldPlusFour.column === field.column + 1 &&
        fieldPlusFour.row === field.row + 1 &&
        fieldSubFour !== undefined &&
        fieldSubFour.fieldSign === opponentSign &&
        fieldSubFour.column === field.column - 1 &&
        fieldSubFour.row === field.row - 1) ||
      (field.isClicked === false &&
        fieldSubEight !== undefined &&
        fieldSubEight.fieldSign === opponentSign &&
        fieldSubEight.column === field.column - 2 &&
        fieldSubEight.row === field.row - 2 &&
        fieldSubFour !== undefined &&
        fieldSubFour.fieldSign === opponentSign &&
        fieldSubFour.column === field.column - 1 &&
        fieldSubFour.row === field.row - 1) ||
      (field.isClicked === false &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === opponentSign &&
        fieldPlusFour.column === field.column + 1 &&
        fieldPlusFour.row === field.row + 1 &&
        fieldPlusEight !== undefined &&
        fieldPlusEight.fieldSign === opponentSign &&
        fieldPlusEight.column === field.column + 2 &&
        fieldPlusEight.row === field.row + 2) ||
      (field.isClicked === false &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === opponentSign &&
        fieldPlusFour.column === field.column + 1 &&
        fieldPlusFour.row === field.row + 1 &&
        fieldSubFour !== undefined &&
        fieldSubFour.fieldSign === opponentSign &&
        fieldSubFour.column === field.column - 1 &&
        fieldSubFour.row === field.row - 1) ||
      (field.isClicked === false &&
        fieldPlusTwo !== undefined &&
        fieldPlusTwo.fieldSign === opponentSign &&
        fieldPlusTwo.column === field.column - 1 &&
        fieldPlusTwo.row === field.row + 1 &&
        fieldPlusFour !== undefined &&
        fieldPlusFour.fieldSign === opponentSign &&
        fieldPlusFour.column === field.column - 2 &&
        fieldPlusFour.row === field.row + 2) ||
      (field.isClicked === false &&
        fieldPlusTwo !== undefined &&
        fieldPlusTwo.fieldSign === opponentSign &&
        fieldPlusTwo.column === field.column - 1 &&
        fieldPlusTwo.row === field.row + 1 &&
        fieldSubTwo !== undefined &&
        fieldSubTwo.fieldSign === opponentSign &&
        fieldSubTwo.column === field.column + 1 &&
        fieldSubTwo.row === field.row - 1) ||
      (field.isClicked === false &&
        fieldSubTwo !== undefined &&
        fieldSubTwo.fieldSign === opponentSign &&
        fieldSubTwo.column === field.column + 1 &&
        fieldSubTwo.row === field.row - 1 &&
        fieldSubFour !== undefined &&
        fieldSubFour.fieldSign === opponentSign &&
        fieldSubFour.column === field.column + 2 &&
        fieldSubFour.row === field.row - 2)
    ) {
      return field;
    }
  };

  computerPick = () => {
    //variable to contain the field that the AI chooses
    let chosenField = "";

    //List of fields that are needed to pick in order to counter human player
    const counterMoves = this.state.fields.filter(this.counterOpponent);
    const moves = this.state.fields.filter(field => field.isClicked === false);

    //list of the moves that the AI should pick if
    let firstMoves = [
      this.state.fields[0],
      this.state.fields[4],
      this.state.fields[8]
    ].filter(item => item.isClicked === false);

    const randomInt = max => Math.floor(Math.random() * Math.floor(max));
    const randomIndex = moves[randomInt(moves.length)].id - 1;

    if (this.state.players[0].turn === false && this.state.gameOver === false) {
      //creates list of non-clicked fields
      //method for creating random number to use as index
      //creates randomIndex with above method
    }
    //Makes a random move based on the 2-3 possibiles in firstMoves list. It is only meant to determine AI's first move.
    if (counterMoves.length === 1) {
      chosenField = counterMoves[0];
    } else if (firstMoves.length > 0) {
      chosenField = firstMoves[randomInt(firstMoves.length)];
      //after making first move, AI should start to counter
    } else if (counterMoves.length > 0) {
      const randomIndex1 = counterMoves[randomInt(counterMoves.length)].id - 1;

      // if there are more than 1 option, the computer will pick between the two options randomly - to simulate mistakes. So it may overlook a possibility for the human to win.
      chosenField = this.state.fields[randomIndex1];
    } else {
      chosenField = this.state.fields[randomIndex];
    }
    //makes sure to change the chosenFields state to isClicked
    chosenField.isClicked = true;
    // changes player after AI made its move
    this.changePlayer();
    //see function for explanation
    this.toggleSign(chosenField);
    //checks to see if game has ended
    this.gameOver(chosenField);
  };

  gameOver = field => {
    //creates variable names for fields to check
    const eventIndex = field.id - 1;

    // row variables
    const currentField = this.state.fields[eventIndex];
    const fieldPlusOne = this.state.fields[eventIndex + 1];
    const fieldPlusTwo = this.state.fields[eventIndex + 2]; //also used in mixed line
    const fieldSubOne = this.state.fields[eventIndex - 1];
    const fieldSubTwo = this.state.fields[eventIndex - 2];

    //column variables

    const fieldPlusThree = this.state.fields[eventIndex + 3];
    const fieldPlusSix = this.state.fields[eventIndex + 6];
    const fieldSubThree = this.state.fields[eventIndex - 3];
    const fieldSubSix = this.state.fields[eventIndex - 6];

    //mixed line variables

    const fieldPlusFour = this.state.fields[eventIndex + 4]; //also used in mixed line
    const fieldPlusEight = this.state.fields[eventIndex + 8];
    const fieldSubFour = this.state.fields[eventIndex - 4];
    const fieldSubEight = this.state.fields[eventIndex - 8];

    if (
      this.state.fields[0].isClicked &&
      this.state.fields[1].isClicked &&
      this.state.fields[2].isClicked &&
      this.state.fields[3].isClicked &&
      this.state.fields[4].isClicked &&
      this.state.fields[5].isClicked &&
      this.state.fields[6].isClicked &&
      this.state.fields[7].isClicked &&
      this.state.fields[8].isClicked
    ) {
      this.setState({ gameOver: true, draw: true });
    }

    if (
      fieldPlusOne !== undefined &&
      fieldPlusOne.fieldSign === currentField.fieldSign &&
      fieldPlusOne.row === currentField.row &&
      fieldPlusTwo !== undefined &&
      fieldPlusTwo.fieldSign === currentField.fieldSign &&
      fieldPlusTwo.row === currentField.row
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    } else if (
      fieldPlusOne !== undefined &&
      fieldPlusOne.fieldSign === currentField.fieldSign &&
      fieldPlusOne.row === currentField.row &&
      fieldSubOne !== undefined &&
      fieldSubOne.fieldSign === currentField.fieldSign &&
      fieldSubOne.row === currentField.row
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    } else if (
      fieldSubOne !== undefined &&
      fieldSubOne.fieldSign === currentField.fieldSign &&
      fieldSubOne.row === currentField.row &&
      fieldSubTwo !== undefined &&
      fieldSubTwo.fieldSign === currentField.fieldSign &&
      fieldSubTwo.row === currentField.row
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    }

    //logic for setting game to over when 3 in column:

    if (
      fieldPlusThree !== undefined &&
      fieldPlusThree.fieldSign === currentField.fieldSign &&
      fieldPlusThree.column === currentField.column &&
      fieldPlusSix !== undefined &&
      fieldPlusSix.fieldSign === currentField.fieldSign &&
      fieldPlusSix.column === currentField.column
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    } else if (
      fieldPlusThree !== undefined &&
      fieldPlusThree.fieldSign === currentField.fieldSign &&
      fieldPlusThree.column === currentField.column &&
      fieldSubThree !== undefined &&
      fieldSubThree.fieldSign === currentField.fieldSign &&
      fieldSubThree.column === currentField.column
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    } else if (
      fieldSubThree !== undefined &&
      fieldSubThree.fieldSign === currentField.fieldSign &&
      fieldSubThree.column === currentField.column &&
      fieldSubSix !== undefined &&
      fieldSubSix.fieldSign === currentField.fieldSign &&
      fieldSubSix.column === currentField.column
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    }

    //logic for setting game to over when 3 in a mixed line:

    if (
      fieldPlusFour !== undefined &&
      fieldPlusFour.fieldSign === currentField.fieldSign &&
      fieldPlusFour.column === currentField.column + 1 &&
      fieldPlusFour.row === currentField.row + 1 &&
      fieldPlusEight !== undefined &&
      fieldPlusEight.fieldSign === currentField.fieldSign &&
      fieldPlusEight.column === currentField.column + 2 &&
      fieldPlusEight.row === currentField.row + 2
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    } else if (
      fieldPlusFour !== undefined &&
      fieldPlusFour.fieldSign === currentField.fieldSign &&
      fieldPlusFour.column === currentField.column + 1 &&
      fieldPlusFour.row === currentField.row + 1 &&
      fieldSubFour !== undefined &&
      fieldSubFour.fieldSign === currentField.fieldSign &&
      fieldSubFour.column === currentField.column - 1 &&
      fieldSubFour.row === currentField.row - 1
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    } else if (
      fieldSubEight !== undefined &&
      fieldSubEight.fieldSign === currentField.fieldSign &&
      fieldSubEight.column === currentField.column - 2 &&
      fieldSubEight.row === currentField.row - 2 &&
      fieldSubFour !== undefined &&
      fieldSubFour.fieldSign === currentField.fieldSign &&
      fieldSubFour.column === currentField.column - 1 &&
      fieldSubFour.row === currentField.row - 1
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    }

    if (
      fieldPlusFour !== undefined &&
      fieldPlusFour.fieldSign === currentField.fieldSign &&
      fieldPlusFour.column === currentField.column + 1 &&
      fieldPlusFour.row === currentField.row + 1 &&
      fieldPlusEight !== undefined &&
      fieldPlusEight.fieldSign === currentField.fieldSign &&
      fieldPlusEight.column === currentField.column + 2 &&
      fieldPlusEight.row === currentField.row + 2
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    } else if (
      fieldPlusFour !== undefined &&
      fieldPlusFour.fieldSign === currentField.fieldSign &&
      fieldPlusFour.column === currentField.column + 1 &&
      fieldPlusFour.row === currentField.row + 1 &&
      fieldSubFour !== undefined &&
      fieldSubFour.fieldSign === currentField.fieldSign &&
      fieldSubFour.column === currentField.column - 1 &&
      fieldSubFour.row === currentField.row - 1
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    }

    /*else if (fieldSubEight !== undefined && fieldSubEight.fieldSign === currentField.fieldSign && fieldSubEight.column === currentField.column-2 && fieldSubEight.row === currentField.row-2 && 
      fieldSubFour !== undefined && fieldSubFour.fieldSign === currentField.fieldSign && fieldSubFour.column=== currentField.column-1 && fieldSubFour.row === currentField.row -1) {
        this.setState({gameOver: true})
        this.updateScore()
    }*/

    // other way

    if (
      fieldPlusTwo !== undefined &&
      fieldPlusTwo.fieldSign === currentField.fieldSign &&
      fieldPlusTwo.column === currentField.column - 1 &&
      fieldPlusTwo.row === currentField.row + 1 &&
      fieldPlusFour !== undefined &&
      fieldPlusFour.fieldSign === currentField.fieldSign &&
      fieldPlusFour.column === currentField.column - 2 &&
      fieldPlusFour.row === currentField.row + 2
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    } else if (
      fieldPlusTwo !== undefined &&
      fieldPlusTwo.fieldSign === currentField.fieldSign &&
      fieldPlusTwo.column === currentField.column - 1 &&
      fieldPlusTwo.row === currentField.row + 1 &&
      fieldSubTwo !== undefined &&
      fieldSubTwo.fieldSign === currentField.fieldSign &&
      fieldSubTwo.column === currentField.column + 1 &&
      fieldSubTwo.row === currentField.row - 1
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    } else if (
      fieldSubTwo !== undefined &&
      fieldSubTwo.fieldSign === currentField.fieldSign &&
      fieldSubTwo.column === currentField.column + 1 &&
      fieldSubTwo.row === currentField.row - 1 &&
      fieldSubFour !== undefined &&
      fieldSubFour.fieldSign === currentField.fieldSign &&
      fieldSubFour.column === currentField.column + 2 &&
      fieldSubFour.row === currentField.row - 2
    ) {
      this.setState({ gameOver: true });
      this.updateScore();
    }
  };

  startAgain = () => {
    const playerOne = this.state.players[0];
    const playerTwo = this.state.players[1];
    playerOne.turn = this.state.firstPick === "X" ? false : true;
    playerTwo.turn = this.state.firstPick === "X" ? true : false;
    playerOne.moves = 0;
    playerTwo.moves = 0;
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
          row: 2,
          column: 1
        },
        {
          id: 5,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 2
        },
        {
          id: 6,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 2,
          column: 3
        },

        {
          id: 7,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 1
        },
        {
          id: 8,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 2
        },
        {
          id: 9,
          isClicked: false,
          imgSrc: "",
          fieldSign: "",
          row: 3,
          column: 3
        }
      ],
      sign: "O",
      gameOver: false,
      draw: false,
      firstPick: this.state.firstPick === "X" ? "O" : "X"
    };
    this.setState(initialState);
    this.setState({ playerOne });
    this.setState({ playerTwo });

    const fieldElements = document.getElementsByClassName("field");
    Array.prototype.forEach.call(fieldElements, function(element) {
      element.innerHTML = "";
    });
  };

  resetScore = () => {
    const playerOne = this.state.players[0];
    const playerTwo = this.state.players[1];
    playerOne.score = 0;
    playerOne.turn = true;
    playerTwo.score = 0;
    playerTwo.turn = false;
    this.setState({ playerOne });
    this.setState({ playerTwo });
  };

  createFields = array => {
    return (
      <div
        className="gameContainer"
        style={
          this.state.players[1].aI && this.state.players[1].turn
            ? {
                boxShadow: "0 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px #ffffff"
              }
            : { boxShadow: "" }
        }
      >
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
            <h1 id="gameOver">
              Game Over -{" "}
              {this.state.draw
                ? "It's a draw!"
                : this.state.players[0].turn
                ? "O wins!"
                : "X wins!"}
            </h1>
          ) : (
            <h1 id="gameHeading">TickyTock :o)</h1>
          )}
        </div>
        <div className="instructions">
          <ol>
            <li>Place an "X" or "O".</li>
            <li>3 on a line wins a round.</li>
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
          <h2
            id="toggleAi"
            style={
              this.state.players[1].aI ? { color: "green" } : { color: "red" }
            }
            onClick={this.toggleAi}
          >
            {this.state.players[1].aI
              ? "Click for multiplayer"
              : "Click for robot"}
          </h2>
          <h2 id="resetScore" onClick={this.resetScore}>
            Reset Score?{" "}
          </h2>
          <p id="playerTwoScore">O - points: {this.state.players[1].score}</p>
        </div>
        <div className="board-wrapper">
          {this.createFields(this.createArray(this.state.fields))}
        </div>
      </div>
    );
  }
}

export default TickTock3;
