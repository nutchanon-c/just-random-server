const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/random/coin", (req, res) => {
  let randomResult = randomIntFromInterval(0, 1);
  console.log(`Random coin result ${randomResult}`);
  res.json({ result: randomResult === 1 ? "tails" : "heads" });
});

app.get("/random/dice", (req, res) => {
  let randomResult = randomIntFromInterval(1, 6);
  console.log(`Random dice result ${randomResult}`);
  res.json({ result: randomResult });
});

app.get("/random/card", (req, res) => {
  let randomNumber = randomIntFromInterval(1, 13);
  let randomSuite = randomIntFromInterval(1, 4);
  let number = randomNumber.toString();
  let suite = "";
  switch (randomNumber) {
    case 11:
      number = "J";
      break;
    case 12:
      number = "Q";
    case 13:
      number = "K";
    case 1:
      number = "A";
    default:
      break;
  }

  switch (randomSuite) {
    case 1:
      suite = "Spades";
      break;
    case 2:
      suite = "Hearts";
      break;
    case 3:
      suite = "Diamonds";
      break;
    case 4:
      suite = "Clubs";
      break;
    default:
      break;
  }
  res.json({
    randomNumber: randomNumber,
    suiteNumber: randomSuite,
    cardValue: number,
    suite: suite,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
