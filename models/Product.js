var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Product = module.exports = mongoose.model('Product', productSchema);

module.exports.getAllProducts = function (query, sort, callback) {
  Product.find(query, null, sort, callback)
}

