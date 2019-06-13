const express = require("express");
// Create a new router instance
const app = express.Router();

const PhoneBook = require("../models/phonebook");

const { generateId, duplicateName } = require("../utils/helpers");

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
  // res.json(persons);
  PhoneBook.find({}).then(persons => {
    res.json(persons);
  });
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

  if (!body.name) {
    return res.status(404).json({ error: "Name cannot be missing" });
  } else if (body.name) {
    // check to see if a duplicate name exists
    let name = duplicateName(persons, body.name);
    if (name) {
      return res.status(404).json({ error: "Duplicate name found." });
    }
  }

  if (!body.number) {
    return res.status(404).json({ error: "Number cannot be missing." });
  }
  // create a new instance of the PhoneBook constructor function with the values passed in from the body of the post request
  const person = new PhoneBook({
    content: body.content,
    name: body.name,
    number: body.number,
    date: new Date()
  });
  // Make sure the new person is saved to the database before returning the document.
  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  });
});

/*

Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook
Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error,
*/

module.exports = app;
