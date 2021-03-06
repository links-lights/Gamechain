import React from "react";
import {
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Paper,
  Grid,
  Table,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: null,
      score: 0,
      gameOver: false,
      message: null,
      rewarded: false,
      rewardAmount: 0,
      extraTokens: false,
    };
    // this.awardAmount = this.awardAmount.bind(this);
    this.setReward = this.setReward.bind(this);
    // this.setBoard = this.setBoard.bind(this);
    this.probability = this.probability.bind(this);
  }

  probability(n) {
    return Math.random() < n;
  }

  random(n) {
    return Math.floor(Math.random() * n);
  }
  // Reward Player
  async setReward() {
    toast.configure();
    let highestBoard = 0;
    const contract = this.props.contracts.TZFEToken;
    const NFT = this.props.contracts.GameNFT;

    const account = this.props.account;
    let amount = 0;
    let tokenOdds = 0;
    let NFTodds = 0;
    this.state.board.forEach((row) => {
      highestBoard = Math.max(...row, highestBoard);
    });
    if (highestBoard >= 512) {
      tokenOdds += 0.1;
    }
    if (this.state.score >= 5000) {
      tokenOdds += 0.1;
    }
    if (highestBoard >= 1024) {
      tokenOdds += 0.15;
    }
    if (this.state.score >= 1000) {
      tokenOdds += 0.15;
    }
    if (highestBoard >= 2048) {
      tokenOdds += 0.25;
    }
    if (this.state.score >= 20000) {
      tokenOdds += 0.25;
      NFTodds += 0.001;
      this.setState({ extraTokens: true });
    }
    if (this.state.score >= 40000) {
      NFTodds += 0.001;
    }
    if (this.state.score >= 60000) {
      NFTodds += 0.001;
    }
    if (this.state.score >= 80000) {
      NFTodds += 0.001;
    }
    if (this.state.score >= 100000) {
      NFTodds += 0.001;
    }
    //make 100*
    console.log(`You have a ${tokenOdds * 100}% of getting a token`);
    console.log(`You have a ${NFTodds * 100}% of getting a NFT`);

    // const NFTBank = { 0: false, 1: false, 2: false, 3: false, 4: false };
    //Testing purposes:
    // tokenOdds= 1
    // NFTodds = 1
    if (this.probability(tokenOdds)) {
      if (this.extraTokens) {
        amount = this.random(4);
        toast("Odds are in your favor, you won a token!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await contract.methods.reward(account, amount).send({ from: account });
        await this.props.awardAmount(amount + this.state.rewardAmount);
        this.setState({
          rewardAmount: this.state.rewardAmount + 1,
        });
      } else {
        toast("Odds are in your favor, you won a token!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await contract.methods.reward(account, 1).send({ from: account });
        await this.props.awardAmount(1 + this.state.rewardAmount);
        this.setState({
          rewardAmount: this.state.rewardAmount + 1,
        });
      }
    } else {
      toast("???? Unfortunately, you did not win a token", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (this.probability(NFTodds)) {
      toast("Wow! You won an NFT!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const chosenNFT = this.random(5);
      // for (let key in NFTBank) {
      //   if (!NFTBank[key])
      //     await NFT.methods.reward(account, chosenNFT).send({ from: account });
      //   NFTBank[key] = true;
      //   break;
      // }
      console.log(await NFT.methods.uri(chosenNFT).call());
      console.log(chosenNFT);
      await NFT.methods.reward(account, chosenNFT).send({ from: account });
    }

    this.props.highScore(this.state.score);

    console.log(await contract.methods.balanceOf(account).call());
  }

  // Create board with two random coordinate numbers
  initBoard() {
    let board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    board = this.placeRandom(this.placeRandom(board));
    this.setState({
      board,
      score: 0,
      gameOver: false,
      message: null,
      rewarded: false,
    });
  }

  // Get all blank coordinates from board
  getBlankCoordinates(board) {
    const blankCoordinates = [];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {
          blankCoordinates.push([r, c]);
        }
      }
    }

    return blankCoordinates;
  }

  // Grab random start number
  randomStartingNumber() {
    const startingNumbers = [2, 4];
    const randomNumber =
      startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  }

  // Place random starting number on an empty coordinate
  placeRandom(board) {
    const blankCoordinates = this.getBlankCoordinates(board);
    const randomCoordinate =
      blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    const randomNumber = this.randomStartingNumber();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  }

  // Compares two boards to check for movement
  boardMoved(original, updated) {
    return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
  }

  // Moves board depending on direction and checks for game over
  move(direction) {
    if (!this.state.gameOver) {
      if (direction === "up") {
        const movedUp = this.moveUp(this.state.board);
        if (this.boardMoved(this.state.board, movedUp.board)) {
          const upWithRandom = this.placeRandom(movedUp.board);

          if (this.checkForGameOver(upWithRandom)) {
            this.setState(
              {
                board: upWithRandom,
                gameOver: true,
                message: "Game over!",
              },
              () => {
                if (!this.state.rewarded) {
                  // this.props.setBoard(this.state.board);
                  this.setState({ rewarded: true }, this.setReward);
                  this.props.setScore(this.state.score);
                }
              }
            );
          } else {
            this.setState({
              board: upWithRandom,
              score: this.state.score + movedUp.score,
            });
          }
        }
      } else if (direction === "right") {
        const movedRight = this.moveRight(this.state.board);
        if (this.boardMoved(this.state.board, movedRight.board)) {
          const rightWithRandom = this.placeRandom(movedRight.board);

          if (this.checkForGameOver(rightWithRandom)) {
            this.setState(
              {
                board: rightWithRandom,
                gameOver: true,
                message: "Game over!",
              },
              () => {
                if (!this.state.rewarded) {
                  // this.props.setBoard(this.state.board);
                  this.setState({ rewarded: true }, this.setReward);
                  this.props.setScore(this.state.score);
                }
              }
            );
          } else {
            this.setState({
              board: rightWithRandom,
              score: this.state.score + movedRight.score,
            });
          }
        }
      } else if (direction === "down") {
        const movedDown = this.moveDown(this.state.board);
        if (this.boardMoved(this.state.board, movedDown.board)) {
          const downWithRandom = this.placeRandom(movedDown.board);

          if (this.checkForGameOver(downWithRandom)) {
            this.setState(
              {
                board: downWithRandom,
                gameOver: true,
                message: "Game over!",
              },
              () => {
                if (!this.state.rewarded) {
                  // this.props.setBoard(this.state.board);
                  this.setState({ rewarded: true }, this.setReward);
                  this.props.setScore(this.state.score);
                }
              }
            );
          } else {
            this.setState({
              board: downWithRandom,
              score: this.state.score + movedDown.score,
            });
          }
        }
      } else if (direction === "left") {
        const movedLeft = this.moveLeft(this.state.board);
        if (this.boardMoved(this.state.board, movedLeft.board)) {
          const leftWithRandom = this.placeRandom(movedLeft.board);

          if (this.checkForGameOver(leftWithRandom)) {
            this.setState(
              {
                board: leftWithRandom,
                gameOver: true,
                message: "Game over!",
              },
              () => {
                if (!this.state.rewarded) {
                  // this.props.setBoard(this.state.board);
                  this.setState({ rewarded: true }, this.setReward);
                  this.props.setScore(this.state.score);
                }
              }
            );
          } else {
            this.setState({
              board: leftWithRandom,
              score: this.state.score + movedLeft.score,
            });
          }
        }
      }
    } else {
      this.setState({ message: "Game over. Please start a new game." }, () => {
        if (!this.state.rewarded) {
          // this.props.setBoard(this.state.board);
          this.setState({ rewarded: true }, this.setReward);
        }
        this.props.setScore(this.state.score);
      });
    }
  }

  moveUp(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let score = 0;

    // Shift all numbers to the right
    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = 0; c < rotatedRight[r].length; c++) {
        let current = rotatedRight[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to right
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    // Rotate board back upright
    board = this.rotateLeft(board);

    return { board, score };
  }

  moveRight(inputBoard) {
    let board = [];
    let score = 0;

    // Shift all numbers to the right
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to right
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    return { board, score };
  }

  moveDown(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let score = 0;

    // Shift all numbers to the left
    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to left
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    // Rotate board back upright
    board = this.rotateLeft(board);

    return { board, score };
  }

  moveLeft(inputBoard) {
    let board = [];
    let score = 0;

    // Shift all numbers to the left
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to left
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    return { board, score };
  }

  rotateRight(matrix) {
    let result = [];

    for (let c = 0; c < matrix.length; c++) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.push(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  }

  rotateLeft(matrix) {
    let result = [];

    for (let c = matrix.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.unshift(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  }

  // Check to see if there are any moves left
  checkForGameOver(board) {
    let moves = [
      this.boardMoved(board, this.moveUp(board).board),
      this.boardMoved(board, this.moveRight(board).board),
      this.boardMoved(board, this.moveDown(board).board),
      this.boardMoved(board, this.moveLeft(board).board),
    ];

    return moves.includes(true) ? false : true;
  }

  componentWillMount() {
    this.initBoard();
    const body = document.querySelector("body");
    body.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    const n = 78;

    if (e.keyCode === up || e.keyCode === 87) {
      this.move("up");
    } else if (e.keyCode === right || e.keyCode === 68) {
      this.move("right");
    } else if (e.keyCode === down || e.keyCode === 83) {
      this.move("down");
    } else if (e.keyCode === left || e.keyCode === 65) {
      this.move("left");
    } else if (e.keyCode === n) {
      this.initBoard();
    }
  }

  render() {
    return (
      <Grid container direction="column" alignContent="center">
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#303030",
              color: "#50c8ff",
              alignSelf: "center",
            }}
            onClick={() => {
              this.initBoard();
            }}
          >
            New Game
          </Button>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h5">Score: {this.state.score}</Typography>
        </Grid>

        <Grid item>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "440px",
              Height: "440px",
              backgroundColor: "#303030",
            }}
          >
            <Table>
              {this.state.board.map((row, i) => (
                <Row key={i} row={row} />
              ))}
            </Table>
          </TableContainer>

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="h6">{this.state.message}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const Row = ({ row }) => {
  return (
    <TableBody>
      <TableRow>
        {row.map((cell, i) => (
          <Cell key={i} cellValue={cell} />
        ))}
      </TableRow>
    </TableBody>
  );
};

const Cell = ({ cellValue }) => {
  let value = cellValue === 0 ? "" : cellValue;
  //push value into color maker and get corresponding background color
  let bgColor;
  switch (cellValue) {
    case 2:
      bgColor = "#50c8ff";
      break;
    case 4:
      bgColor = "green";
      break;
    case 8:
      bgColor = "red";
      break;
    case 16:
      bgColor = "orange";
      break;
    case 32:
      bgColor = "yellow";
      break;
    case 64:
      bgColor = "blue";
      break;
    case 128:
      bgColor = "purple";
      break;
    case 256:
      bgColor = "pink";
      break;
    case 1024:
      bgColor = "green";
      break;
    case 2048:
      bgColor = "blue";
      break;
    default:
      bgColor = "#303030";
  }
  let dynamicColor = {
    backgroundColor: `${bgColor}`,
    color: "#FFFFFF",
    fontSize: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    borderRadius: "5px",
  };

  return (
    <TableCell
      sx={{
        height: "100px",
        width: "100px",
        backgroundColor: "#303030",
        borderRadius: "5px",
        padding: "5px",
        border: "0px solid black",
      }}
    >
      <Box sx={dynamicColor}>{value}</Box>
    </TableCell>
  );
};
export default Game;
