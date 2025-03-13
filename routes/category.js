const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// 🟢 CREATE: Tạo danh mục mới
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 READ: Lấy tất cả danh mục (bỏ qua danh mục đã xóa)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 READ: Lấy danh mục theo ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category || category.isDeleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟠 UPDATE: Cập nhật danh mục theo ID
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!category || category.isDeleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔴 DELETE: Xóa mềm (chuyển isDeleted thành true)
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
