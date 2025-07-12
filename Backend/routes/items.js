const express = require('express');
const auth = require('../middleware/auth');
const multer = require('multer');
const { getItems, getItem, addItem, getMyItems } = require('../controllers/itemController');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', getItems);
router.get('/my', auth, getMyItems);
router.get('/:id', getItem);
// Accept a single file with field name 'image'
router.post('/', auth, upload.single('image'), addItem);

module.exports = router;