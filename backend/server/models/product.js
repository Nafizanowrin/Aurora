const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0, // Default amount set to 0
  },
  success: {
    type: Boolean,
    required: true,
    default: false
  },
  status: {
    type: String,
    required: true,
    default: "Ordered"
  }
});

// Create a compound unique index on `id` and `email`
productSchema.index({ id: 1, email: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
