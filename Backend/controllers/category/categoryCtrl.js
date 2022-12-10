const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbID");
const Category = require("../../model/Category/Category");

//create
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

//fetch all categories
const fetchCategoriesCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate("user")
      .sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

//fetch a single category
const fetchCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate("user");

    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

//Update category
const updateCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCategoryCtrl,
  fetchCategoriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
};
