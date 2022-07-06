const Category = require('../models/Category')
const { StatusCodes } = require('http-status-codes')

const getCategories = async (req, res) => {
  const perPage = parseInt(req.query.perPage) || 8;
  const page = parseInt(req.query.page) || 1;

  try {
    const categories = await Category.find({})
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage);

    const count = await Category.count();
    const totalPages = Math.ceil(count / perPage);
    const nextPage = (totalPages > page) ? (page + 1) : null;
    const nextPageUrl = (nextPage && perPage)
      ? `/categories?page=${nextPage}&perPage=${perPage}` 
      : null

    res.json({
      pageName: "All Categories",
      categories,
      current: page,
      nextPage: nextPage,
      nextPageUrl: nextPageUrl,
      pages: totalPages,
    });
  } catch (error) {
    console.log(error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Something went wrong"
      })
  }
};

const createCategory = async (req, res) => {
  const category = await Category.create({...req.body})

  res.json(category);
};
module.exports = {
  getCategories,
  createCategory
}