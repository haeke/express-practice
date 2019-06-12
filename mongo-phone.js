const mongoose = require("mongoose");

if (process.env.length < 3) {
  console.log("please provide password.");
  process.exit();
}
// the password will be passed as the third argument
const password = process.argv[2];
// The new url will create documents inside of the database named phonebook-app
const url = `mongodb+srv://waehake:${password}@cluster0-upfow.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });
// the phonebook schema will contain the contactName, contactNumber, date and id the _id is auto generated.
const phoneSchema = new mongoose.Schema({
  contactName: String,
  contactNumber: Number,
  date: Date
});

const PhoneBook = mongoose.model("Phonebook", phoneSchema);
// the contact object that we want to save, we will use command line arguments to create the name and number, the date and id will be created dynamically.
const contact = new PhoneBook({
  contactName: process.argv[3],
  contactNumber: Number(process.argv[4]),
  date: new Date()
});
// will save the document to the database
contact.save().then(response => {
  console.log(`added ${contact} to phonebook`);
  mongoose.connection.close();
});
