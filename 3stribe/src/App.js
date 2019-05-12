import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import TickTock4 from "./components/TickTock4/TickTock4";
import TickTock3 from "./components/TickTock3/Tock3";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  /*constructor() {
    super()

    this.createArray = this.createArray.bind(this);
    this.createFields = this.createFields.bind(this);
    this.handleEnter = this.handleEnter.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.updateScore = this.updateScore.bind()
    this.gameOver = this.gameOver.bind(this)  
    this.startAgain = 
this.startAgain.bind(this)

    //saves state in a variable so that the variable later can be used to reset the game
    this.initialState1 = {
      fields: [
        {id: 1, isClicked: false, imgSrc: "", fieldSign: "", row: 1, column: 1},
        {id: 2, isClicked: false, imgSrc: "", fieldSign: "", row: 1, column: 2},
        {id: 3, isClicked: false, imgSrc: "", fieldSign: "", row: 1, column: 3},

        {id: 4, isClicked: false, imgSrc: "", fieldSign: "", row: 2, column: 1},
        {id: 5, isClicked: false, imgSrc: "", fieldSign: "", row: 2, column: 2},
        {id: 6, isClicked: false, imgSrc: "", fieldSign: "", row: 2, column: 3},

        {id: 7, isClicked: false, imgSrc: "", fieldSign: "", row: 3, column: 1},
        {id: 8, isClicked: false, imgSrc: "", fieldSign: "", row: 3, column: 2},
        {id: 9, isClicked: false, imgSrc: "", fieldSign: "", row: 3, column: 3}
      ],
      sign: "O",
      gameOver: false,
      players: [{name: "Player 1", score: 0, sign: "X", turn: true}, {name: "Player Two", score: 0, sign: "O", turn: false}]
    }

    this.state = this.initialState1;
  }*/
  /*
  //Creates array with HTML markup based on the field array in state.
  createArray = (array) => {
    const rowOfFields = array.map(field => {
      return(
      <div key={field.id} id={field.id} className="field" onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave} onClick={this.handleClick}>{field.imgSrc}</div>
      )
  })
  return rowOfFields
}

//Contains the logic that shows the sign when hovering over a field.
handleEnter = (event) => {
  const changeToO = () => {
    return event.target.innerHTML = "O"
  }
  const changeToX = () => {
    return event.target.innerHTML = "X"
  }
  const decideSign = () => {
    return this.state.sign === "X"? changeToO() : changeToX();}

  const eventIndex = (parseInt(event.target.id)-1)
  this.state.fields[eventIndex].isClicked === false && !this.state.gameOver && decideSign()
}

//Makes sure that the sign dissapears when mouse leaves field - of course only if isClicked is set to false.
handleLeave = (event) => {
  const eventIndex = (parseInt(event.target.id)-1)
  const backToSign = () => {
    event.target.innerHTML  = ""
  }
  this.state.fields[eventIndex].isClicked === false && backToSign()
}

updateScore = () => {
  if(this.state.sign === "O") {
      let playerOne = this.state.players[0]
      let newScore = playerOne.score ++
      this.setState({playerOne: newScore})
      } else if (this.state.sign === "X"){
        let playerOne = this.state.players[1]
        let newScore = playerOne.score ++
        this.setState({playerOne: newScore})
      } else {
        console.log("An error occured.")
      }}

// This is where a lot of the magic happens. Watch comments below.
handleClick = event => {

  //gets index of field in array by substracting 1 from id (as arrays start on index 0)
  const eventIndex = (parseInt(event.target.id)-1)

  //saves current state value in a variable
  const clickedPropertyClicked = this.state.fields[eventIndex];

  //checks to see if isClicked of field is false and that value of gameOver is also false before executing code.
  if (clickedPropertyClicked.isClicked === false && this.state.gameOver === false) {

    //saves the relevant field in a variable for later use.
    const clickedPropertyClickedSrc = this.state.fields[eventIndex];

    //Sets value of isClicked of the relevant field to true - based on the variable above.
    clickedPropertyClicked.isClicked = true;

    //this.state.fields[eventIndex].isClicked === true && this.setState(clickedPropertyClicked)
    //ghosted on 12th of april. Delete on 14th of april if app is still working.

    //Toggles this.state.sign based on whether or not its currently the same as players 1's.
    this.state.sign === this.state.players[0].sign ? this.setState({sign: "O"}) : this.setState({sign: "X"})
    clickedPropertyClickedSrc.fieldSign = this.state.sign === "X" ? "O" : "X"

    //this.setState(clickedPropertyClickedSrc)
    //Ghosted on 12th of april. Delete code on 14th of april if app is stilling working.

    const playerOne = this.state.players[0]
    const playerTwo = this.state.players[1]

    if (playerOne.turn === true) {
      playerOne.turn = false
      playerTwo.turn = true
    } else {
      playerOne.turn = true
      playerTwo.turn = false
    }
    console.log(this.state)
    this.setState({playerOne})
    this.setState({playerTwo})


    this.gameOver(event)
  } else if (clickedPropertyClicked.isClicked === true && this.state.gameOver === true) {
    console.log("It has already been clicked - and the round is already over anyway.")
  } else if (clickedPropertyClicked.isClicked === true) {
    console.log("It has already been clicked.")
  }else if (this.state.gameOver === true) {
    console.log("The round is already over.")
  }
}

gameOver = (event) => {

  //creates variable names for fields to check
  const eventIndex = event.target.id -1

  // row variables
  const currentField = this.state.fields[eventIndex]
  const fieldPlusOne = this.state.fields[eventIndex +1]
  const fieldPlusTwo = this.state.fields[eventIndex +2]
  const fieldSubOne = this.state.fields[eventIndex -1]
  const fieldSubTwo = this.state.fields[eventIndex -2]

  //column variables

  const fieldPlusThree = this.state.fields[eventIndex +3]
  const fieldPlusSix = this.state.fields[eventIndex +6]
  const fieldSubThree = this.state.fields[eventIndex -3]
  const fieldSubSix = this.state.fields[eventIndex -6]

  //mixed line variables

  const fieldPlusFour = this.state.fields[eventIndex +4]
  const fieldPlusEight = this.state.fields[eventIndex +8]
  const fieldSubFour = this.state.fields[eventIndex -4]
  const fieldSubEight = this.state.fields[eventIndex -8]

    if (fieldPlusOne !== undefined && fieldPlusOne.fieldSign === currentField.fieldSign && fieldPlusOne.row === currentField.row && fieldPlusTwo !== undefined && fieldPlusTwo.fieldSign === currentField.fieldSign && fieldPlusTwo.row === currentField.row) {
      this.setState({gameOver: true})
      this.updateScore()
      console.log(currentField.row+1)


  } else if (fieldPlusOne !== undefined && fieldPlusOne.fieldSign === currentField.fieldSign && fieldPlusOne.row === currentField.row && fieldSubOne !== undefined && fieldSubOne.fieldSign === currentField.fieldSign && fieldSubOne.row === currentField.row) {
      this.setState({gameOver: true})
      this.updateScore()

  }  else if (fieldSubOne !== undefined && fieldSubOne.fieldSign === currentField.fieldSign && fieldSubOne.row === currentField.row && fieldSubTwo !== undefined && fieldSubTwo.fieldSign === currentField.fieldSign && fieldSubTwo.row === currentField.row) {
      this.setState({gameOver: true})
      this.updateScore()
    }


    //logic for setting game to over when 3 in column:

    if (fieldPlusThree !== undefined && fieldPlusThree.fieldSign === currentField.fieldSign && fieldPlusThree.column === currentField.column && fieldPlusSix !== undefined && fieldPlusSix.fieldSign === currentField.fieldSign && fieldPlusSix.column=== currentField.column) {
      this.setState({gameOver: true})
      this.updateScore()
    }

    else if (fieldPlusThree !== undefined && fieldPlusThree.fieldSign === currentField.fieldSign && fieldPlusThree.column === currentField.column && fieldSubThree !== undefined && fieldSubThree.fieldSign === currentField.fieldSign && fieldSubThree.column === currentField.column) {
      this.setState({gameOver: true})
      this.updateScore()
    }

    else if (fieldSubThree !== undefined && fieldSubThree.fieldSign === currentField.fieldSign && fieldSubThree.column === currentField.column && fieldSubSix !== undefined && fieldSubSix.fieldSign === currentField.fieldSign && fieldSubSix.column === currentField.column) {
      this.setState({gameOver: true})
      this.updateScore()

  }

    //logic for setting game to over when 3 in a mixed line:

  if (fieldPlusFour !== undefined && fieldPlusFour.fieldSign === currentField.fieldSign && fieldPlusFour.column === currentField.column+1 && fieldPlusFour.row === currentField.row+1 && 
    fieldPlusEight !== undefined && fieldPlusEight.fieldSign === currentField.fieldSign && fieldPlusEight.column=== currentField.column+2 && fieldPlusEight.row === currentField.row +2) {
      this.setState({gameOver: true})
      this.updateScore()
   } 
   
   else if (fieldPlusFour !== undefined && fieldPlusFour.fieldSign === currentField.fieldSign && fieldPlusFour.column === currentField.column+1 && fieldPlusFour.row === currentField.row+1 && fieldSubFour !== undefined && fieldSubFour.fieldSign === currentField.fieldSign && fieldSubFour.column=== currentField.column-1 && fieldSubFour.row === currentField.row -1) {
      this.setState({gameOver: true})
      this.updateScore()

    } 
    
    else if (fieldSubEight !== undefined && fieldSubEight.fieldSign === currentField.fieldSign && fieldSubEight.column === currentField.column-2 && fieldSubEight.row === currentField.row-2 && 
      fieldSubFour !== undefined && fieldSubFour.fieldSign === currentField.fieldSign && fieldSubFour.column=== currentField.column-1 && fieldSubFour.row === currentField.row -1) {
        this.setState({gameOver: true})
        this.updateScore()
    }

  /*

  if (this.state.fields[0].isClicked && this.state.fields[1].isClicked && this.state.fields[2].isClicked &&
    this.state.fields[3].isClicked && this.state.fields[4].isClicked && this.state.fields[5].isClicked &&
    this.state.fields[6].isClicked && this.state.fields[7].isClicked && this.state.fields[8].isClicked)
    {
      this.setState({gameOver: true})
    }

      else if (this.state.fields[0].fieldSign === "X" && this.state.fields[1].fieldSign === "X" && this.state.fields[2].fieldSign === "X")
    {
      this.setState({gameOver: true});
      let currentScore = this.state.players[0]
      currentScore.score++
      this.setState({currentScore})
    } else if (this.state.fields[0].fieldSign === "O" && this.state.fields[1].fieldSign === "O" && this.state.fields[2].fieldSign === "O") {
      this.setState({gameOver: true});
      let currentScore = this.state.players[1]
      currentScore.score++
      this.setState({currentScore})}


      else if (this.state.fields[3].fieldSign === "X" && this.state.fields[4].fieldSign === "X" && this.state.fields[5].fieldSign === "X")
    {
      this.setState({gameOver: true})
      let currentScore = this.state.players[0]
      currentScore.score++
      this.setState({currentScore})

    } else if (this.state.fields[3].fieldSign === "O" && this.state.fields[4].fieldSign === "O" && this.state.fields[5].fieldSign === "O") {
      this.setState({gameOver: true});
      let currentScore = this.state.players[1]
      currentScore.score++
      this.setState({currentScore})
   }


      else if (this.state.fields[6].fieldSign === "X" && this.state.fields[7].fieldSign === "X" && this.state.fields[8].fieldSign === "X")
    {
      this.setState({gameOver: true});
      let currentScore = this.state.players[0]
      currentScore.score++
      this.setState({currentScore})
    } else if (this.state.fields[6].fieldSign === "O" && this.state.fields[7].fieldSign === "O" && this.state.fields[8].fieldSign === "O") {
      this.setState({gameOver: true});
      let currentScore = this.state.players[1]
      currentScore.score++
      this.setState({currentScore})
    }

      else if (this.state.fields[0].fieldSign === "X" && this.state.fields[4].fieldSign === "X" && this.state.fields[8].fieldSign === "X")
    {
      this.setState({gameOver: true});
      let currentScore = this.state.players[0]
      currentScore.score++
      this.setState({currentScore})
    } else if (this.state.fields[0].fieldSign === "O" && this.state.fields[4].fieldSign === "O" && this.state.fields[8].fieldSign === "O") {
      this.setState({gameOver: true})
      let currentScore = this.state.players[1]
      currentScore.score++
      this.setState({currentScore})
    }

      else if (this.state.fields[6].fieldSign === "O" && this.state.fields[7].fieldSign === "O" && this.state.fields[8].fieldSign === "O") {
      this.setState({gameOver: true});
      let currentScore = this.state.players[1]
      currentScore.score++
      this.setState({currentScore})
    } else if (this.state.fields[2].fieldSign === "X" && this.state.fields[4].fieldSign === "X" && this.state.fields[6].fieldSign === "X")
    {
      this.setState({gameOver: true});
      let currentScore = this.state.players[0]
      currentScore.score++
      this.setState({currentScore})
    }


      else if (this.state.fields[2].fieldSign === "O" && this.state.fields[4].fieldSign === "O" && this.state.fields[6].fieldSign === "O") {
      this.setState({gameOver: true})
      let currentScore = this.state.players[1]
      currentScore.score++
      this.setState({currentScore})
    } else if (this.state.fields[0].fieldSign === "X" && this.state.fields[3].fieldSign === "X" && this.state.fields[6].fieldSign === "X")
    {
      this.setState({gameOver: true});
      let currentScore = this.state.players[0]
      currentScore.score++
      this.setState({currentScore})
    } else if (this.state.fields[0].fieldSign === "O" && this.state.fields[3].fieldSign === "O" && this.state.fields[6].fieldSign === "O") {
      this.setState({gameOver: true})
      let currentScore = this.state.players[1]
      currentScore.score++
      this.setState({currentScore})}


      else if (this.state.fields[1].fieldSign === "X" && this.state.fields[4].fieldSign === "X" && this.state.fields[7].fieldSign === "X")
    {
      this.setState({gameOver: true});
      let currentScore = this.state.players[0]
      currentScore.score++
      this.setState({currentScore})
    } else if (this.state.fields[1].fieldSign === "O" && this.state.fields[4].fieldSign === "O" && this.state.fields[7].fieldSign === "O") {
      this.setState({gameOver: true})
      let currentScore = this.state.players[1]
      currentScore.score++
      this.setState({currentScore})
    }


      else if (this.state.fields[2].fieldSign === "X" && this.state.fields[5].fieldSign === "X" && this.state.fields[8].fieldSign === "X")
    {
      this.setState({gameOver: true});
      let currentScore = this.state.players[0]
      currentScore.score++
      this.setState({currentScore})
    } else if (this.state.fields[2].fieldSign === "O" && this.state.fields[5].fieldSign === "O" && this.state.fields[8].fieldSign === "O") {
      this.setState({gameOver: true})
      let currentScore = this.state.players[1]
      currentScore.score++
      this.setState({currentScore})
    }
  //}
    }

startAgain = () => {
  const initialState = {
    fields: [
      {id: 1, isClicked: false, imgSrc: "", fieldSign: "", row: 1, column: 1},
        {id: 2, isClicked: false, imgSrc: "", fieldSign: "", row: 1, column: 2},
        {id: 3, isClicked: false, imgSrc: "", fieldSign: "", row: 1, column: 3},

        {id: 4, isClicked: false, imgSrc: "", fieldSign: "", row: 2, column: 1},
        {id: 5, isClicked: false, imgSrc: "", fieldSign: "", row: 2, column: 2},
        {id: 6, isClicked: false, imgSrc: "", fieldSign: "", row: 2, column: 3},

        {id: 7, isClicked: false, imgSrc: "", fieldSign: "", row: 3, column: 1},
        {id: 8, isClicked: false, imgSrc: "", fieldSign: "", row: 3, column: 2},
        {id: 9, isClicked: false, imgSrc: "", fieldSign: "", row: 3, column: 3}
    ],
    sign: "O",
    gameOver: false,
  }
  this.setState(initialState)
  console.log(this.state);
  const fieldElements = document.getElementsByClassName("field")
  Array.prototype.forEach.call(fieldElements, function(element) {
    element.innerHTML = ""})
}

createFields = (array => {
  return (
    <div className="gameContainer">{this.createArray(this.state.fields)}</div>
  )
}) */

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar />
            <div className="content">
              <div>
                <Route path="/" render={props => <TickTock3 />} exact />
                <Route path="/tock3" render={props => <TickTock3 />} />
                <Route path="/tock4" render={props => <TickTock4 />} />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
