const Item = require('../models/Item');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');

// List all approved items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ approved: true }).populate('uploader', 'name');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single item by id
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('uploader', 'name email');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new item (with Cloudinary image upload)
exports.addItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags } = req.body;
    let imageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'rewear/items' });
        imageUrls.push(result.secure_url);
      }
    }
    const item = new Item({
      title, description, category, type, size, condition,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      images: imageUrls,
      uploader: req.user._id
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get items uploaded by current user
exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ uploader: req.user._id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};