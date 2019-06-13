const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date
});

// Remove the __version and _id from the phoneSchema document, return an id property
phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Phonebook", phoneSchema);
