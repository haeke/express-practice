// A simple server that uses the HTTP library

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const app = express();

// The Note schema along with connection to the MongoDB database.
const Note = require("./models/note");

//@route /api/notes
//@desc returns the current list of documents that exist in the notes-app database on mongodb atlas
//@access public
app.get("/api/notes", (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes);
  });
});

// other routers that we want to use
const persons = require("./routes/persons");

app.use(bodyParser.json());

// use the persons router
app.use("/api/persons", persons);

let notes = [
  {
    id: 1,
    content: "HTML IS EASY",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can only execute JavaScript",
    date: "2019-05-30T17:20:31.098Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T14:39:31.098Z",
    important: true
  }
];
// stand alone function that will return the maximum id from the list of notes
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  // make sure the body has content
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });
  // Ensure that the document is returned after it's saved to the database.
  note.save().then(savedNote => {
    res.json(savedNote.toJSON());
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// define a route that will return a note by ID
app.get("/api/notes/:id", (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      res.json(note.toJSON());
    })
    .catch(error => {
      console.log(error.message);
      res.status(404).end();
    });
});

// define a route that will delete a resource by id
app.delete("/note/:id", (req, res) => {
  const id = Number(req.params.id);

  notes = notes.filter(note => note.id === id);

  // status 204 no content will return a no data response
  res.send(204).end();
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server is running on http://localhost:${port}`);
