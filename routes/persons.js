const express = require("express");
// Create a new router instance
const app = express.Router();
//@route /api/persons/test
//@desc This route is just a test to make sure the router is working with the main router
//@access public access
app.get("/test", (req, res) => {
  res.json({ working: "The phone-book route is working." });
});

const persons = [
  {
    name: "Manny Pacquiao",
    number: "010-230957",
    id: 1
  },
  {
    name: "Floyd Mayweather",
    number: "101-2309457",
    id: 2
  },
  {
    name: "Muhammad Ali",
    number: "309-309482",
    id: 3
  },
  {
    name: "Mike Tyson",
    number: "123-4828322",
    id: 4
  },
  {
    name: "Oscar De La Hoya",
    number: "490-492379",
    id: 5
  },
  {
    name: "Gennady Golovkin",
    number: "128-4848292",
    id: 6
  },
  {
    name: "Canelo Alvarez",
    number: "321-324874621",
    id: 7
  }
];

//@route /api/persons
//@desc Will return a hard coded list of phonenook entries
//@access public
app.get("/", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${
      persons.length
    } different people.</br></br>${new Date()}`
  );
});

module.exports = app;
