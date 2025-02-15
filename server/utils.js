// Function to validate input
function isValidItem(item) {
    if (!item || !item.id || !item.name) {
      return false;
    }
    if (typeof item.name !== "string" || item.name.length > 100) {
      return false;
    }
    return true;
  }
  
  // Function to check if an ID exists in an array
  function itemExists(items, id) {
    return items.some((item) => item.id === id);
  }
  
  module.exports = { isValidItem, itemExists };
  