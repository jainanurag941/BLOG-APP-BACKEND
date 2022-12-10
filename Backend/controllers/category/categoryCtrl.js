const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbID");
const Category = require("../../model/Category/Category");

const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });

    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { createCategoryCtrl };
