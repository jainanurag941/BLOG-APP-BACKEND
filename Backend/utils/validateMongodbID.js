const mongoose = require("mongoose");

const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("The Id is Invalid");
  }
};

module.exports = validateMongodbId;
