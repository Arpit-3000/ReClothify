const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { listPendingItems, approveItem, rejectItem } = require('../controllers/adminController');
const router = express.Router();

router.get('/pending-items', auth, admin, listPendingItems);
router.patch('/approve-item/:id', auth, admin, approveItem);
router.delete('/reject/:id', auth, admin, rejectItem);

module.exports = router;