const express = require('express');
const auth = require('../middleware/auth');
const { requestSwap, getMySwaps } = require('../controllers/swapController');
const router = express.Router();

router.post('/', auth, requestSwap);           // <-- Add this line
router.post('/request', auth, requestSwap);    // (optional, for backward compatibility)
router.get('/my', auth, getMySwaps);

module.exports = router;