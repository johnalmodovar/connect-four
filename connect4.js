"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

const currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for(let i = 0; i < HEIGHT; i++){
    let boardRow = Array.from({length: WIDTH}).fill(null);
    board.push(boardRow);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  // creating top row of game where player pushes to input their game piece
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // looping to create the elements for the top row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    const rowElement = document.createElement("tr");
    rowElement.setAttribute("id", `row-${y}`);


    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // you'll use this later, so make sure you use c-y-x
      cell.setAttribute("id", `c-${y}-${x}`);
      rowElement.append(cell);
    }
    htmlBoard.append(rowElement);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

/*
find lowest empty spot in game board
return y coordinate
*/

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] !== "null") {
      // debugger;
      return y;
    }
  }
  // debugger;
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

//psuedo:
/*
creating a div in the correct cell in the html game board
create a class for it called piece
create another class for it whether the current player is 1 or 2
  p1 or p2
*/

// FIXME: make sure player cell is appending to different cells.
// FIXME: make sure current player is cycling correctly.
function placeInTable(y, x) {
  let playerCell = document.createElement("div");
  playerCell.classList.add("piece");
  playerCell.classList.add(`p-${currPlayer}`);
  let cell = document.getElementById(`c-${y}-${x}`);
  cell.append(playerCell);
  // debugger;
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = parseInt(evt.target.id.slice(evt.target.id.length - 1));
  // console.log(evt.target.id.length-1)
  // debugger;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  // debugger;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // FIXME: use JS gameboard NOT DOM gameboard line 137
  // check for tie
    //every td should have a div in it
    let cells = document.querySelectorAll("td");
    //does it have a class of piece
    if(cells.every(cell => cell.classList.includes("piece"))){
      debugger;
      endGame("TIE");
    }

    // switch players
  if(currPlayer === 1){
    currPlayer = 2;
  }else{
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
