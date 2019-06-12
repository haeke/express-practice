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
// In the Note model definition, the first "Note" parameter is the singular name of the model. The name of collection will the lowercased plural notes, because the Mongoose convention is to automatically name collections as the plural (e.g. notes) when the schema refers to them in the singular (e.g. Note).
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
