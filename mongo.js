const mongoose = require("mongoose");

if (process.env.length < 3) {
  console.log("please provide password.");
  process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://waehake:${password}@cluster0-upfow.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  date: new Date(),
  important: true
});

note.save().then(response => {
  console.log("note saved.");
  mongoose.connection.close();
});
