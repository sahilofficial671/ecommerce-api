var mongoose = require('mongoose');

const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

var productSchema = mongoose.Schema({
  mainImagePath: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  specialPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: "name",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
}, {
  timestamps: true
});

const Product = module.exports = mongoose.model('Product', productSchema);

module.exports.getAllProducts = function (query, sort, callback) {
  Product.find(query, null, sort, callback)
}

