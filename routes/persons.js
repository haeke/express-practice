const express = require("express");
// Create a new router instance
const app = express.Router();

const { generateId } = require("../utils/helpers");

//@route /api/persons/test
//@desc This route is just a test to make sure the router is working with the main router
//@access public access
app.get("/test", (req, res) => {
  res.json({ working: "The phone-book route is working." });
});

let persons = [
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
//@desc Will return a hard coded list of phonebook entries
//@access public
app.get("/", (req, res) => {
  res.json(persons);
});

//@route /api/persons/info
//@desc Will return the number of persons in the persons array along with the current date.
//@access public
app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${
      persons.length
    } different people.</br></br>${new Date()}`
  );
});

//@route /api/persons/:id
//@desc Returns a single person by id passed in as a URL parameter.
//@access public
app.get("/:id", (req, res) => {
  // Get the ID from the req.params.id
  let id = Number(req.params.id);

  let person = persons.find(person => person.id === id);

  if (person) {
    console.log("person found...");
    res.json(person);
  } else {
    res.send(404).end();
  }
});

//@route /api/persons/:id
//@desc deletes a single person from the persons array.
//@access public
app.delete("/:id", (req, res) => {
  // Get the ID from the req.params.id
  let id = Number(req.params.id);
  // Use the filter method to return a new array that does not contain the id passed.
  let phonebook = persons.filter(person => person.id !== id);

  res.send(204).end();
});

//@route /api/persons
//@desc Adds a new person to the persons array.
//@access public
app.post("/", (req, res) => {
  // get the body of the request
  const body = req.body;
  // check to make sure that content exists on the body of the request
  if (!body.content) {
    return res.status(404).json({ error: "Content is missing." });
  }
  const person = {
    content: body.content,
    id: generateId(persons)
  };

  persons = persons.concat(person);
  res.json(person);
});

module.exports = app;
