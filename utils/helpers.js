// stand alone function that will return the maximum id from the list of notes
const generateId = items => {
  const maxId = items.length > 0 ? Math.max(...items.map(item => item.id)) : 0;
  return maxId + 1;
};

module.exports = { generateId };
