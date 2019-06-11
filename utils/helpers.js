// stand alone function that will return the maximum id from the list of notes
const generateId = items => {
  const maxId = items.length > 0 ? Math.max(...items.map(item => item.id)) : 0;
  return maxId + 1;
};
// This function takes in a list of persons with a name property and a new name. It will return the name if one already exists.
const duplicateName = (items, newname) => {
  return items.find(item => item.name.toLowerCase() === newname.toLowerCase());
};

module.exports = { generateId, duplicateName };
