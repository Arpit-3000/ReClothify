const Swap = require('../models/Swap');
const Item = require('../models/Item');
const User = require('../models/User');

// Request a swap or redeem via points
exports.requestSwap = async (req, res) => {
  try {
    const { itemId, type, points } = req.body;
    const item = await Item.findById(itemId);
    if (!item || item.status !== 'available' || !item.approved) return res.status(400).json({ message: 'Item not available' });

    if (type === 'points') {
      if (req.user.points < points) return res.status(400).json({ message: 'Not enough points' });
      req.user.points -= points;
      await req.user.save();
      const owner = await User.findById(item.uploader);
      owner.points += points;
      await owner.save();
    }

    const swap = new Swap({
      item: itemId,
      requester: req.user._id,
      owner: item.uploader,
      type,
      points: type === 'points' ? points : 0
    });
    item.status = 'pending';
    await item.save();
    await swap.save();
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List swaps for current user
exports.getMySwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({ $or: [{ requester: req.user._id }, { owner: req.user._id }] })
      .populate('item')
      .populate('requester', 'name')
      .populate('owner', 'name');
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};