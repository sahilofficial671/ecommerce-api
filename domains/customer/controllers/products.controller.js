const Product = require('../../../models/Product')
const { StatusCodes } = require('http-status-codes')

const getProducts = async (req, res) => {
  const perPage = parseInt(req.query.perPage) || 8;
  const page = parseInt(req.query.page) || 1;
  let search = {};

  if(req.query.search){
    search.title = {
      $regex: req.query.search, $options: "i"
    }
  }

  try {
    const products = await Product.find(search)
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category");

    const count = await Product.count();
    const totalPages = Math.ceil(count / perPage);
    const nextPage = (totalPages > page) ? (page + 1) : null;
    const nextPageUrl = (nextPage && perPage)
      ? `/products?page=${nextPage}&perPage=${perPage}` 
      : null

    res.json({
      pageName: "All Products",
      total: count,
      nbhits: products.length,
      products,
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

  return;
};

const createProduct = async (req, res) => {
  const product = await Product.create({...req.body})

  res.json(product);
};

const getProduct = async (req, res) => {
  const slug = req.params.slug;

  try {
    const product = await Product.findOne({
      slug: slug
    }).populate("category");

    res.json({
      status: "success",
      product: product
    });
  } catch (error) {
    console.log(error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Something went wrong"
      })
  }

  return;
};

module.exports = {
  getProducts,
  createProduct,
  getProduct
}