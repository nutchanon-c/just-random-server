const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
  // console.log(`Random coin result ${randomResult}`);
  res.status(200).json({ result: randomResult === 1 ? "tails" : "heads" });
});

app.get("/random/dice", (req, res) => {
  let randomResult = randomIntFromInterval(1, 6);
  // console.log(`Random dice result ${randomResult}`);
  res.status(200).json({ result: randomResult });
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
  res.status(200).json({
    result: {
      randomNumber: randomNumber,
      suiteNumber: randomSuite,
      cardValue: number,
      suite: suite,
    },
  });
});

app.post("/random/number", (req, res) => {
  console.log(req.body.min);
  let min = req.body.min;
  let max = req.body.max;
  let randomResult = randomIntFromInterval(min, max);
  // console.log(`Random coin result ${randomResult}`);
  res.status(200).json({ result: randomResult });
});

app.post("/random/list", (req, res) => {
  // console.log(req.body.list);
  let list = req.body.list;
  let chosen = list[Math.floor(Math.random() * list.length)];
  // console.log(`Random coin result ${randomResult}`);
  res.status(200).json({ result: chosen });
});

app.get("/random/yesno", (req, res) => {
  let randomResult = randomIntFromInterval(0, 1);

  res.status(200).json({ result: randomResult === 1 ? "yes" : "no" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
