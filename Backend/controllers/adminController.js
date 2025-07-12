const Item = require('../models/Item');

// List all pending items
exports.listPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ approved: false });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve item
exports.approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.approved = true;
    await item.save();
    res.json({ message: 'Item approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject (delete) item
exports.rejectItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item rejected and deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};