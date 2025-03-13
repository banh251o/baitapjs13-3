const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true } // Tự động tạo createdAt và updatedAt
);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
