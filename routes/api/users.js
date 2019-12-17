const express = require('express');
const router = express.Router();

// GET /users/test
router.get('/test', (req, res) => res.json({msg: 'Users works'}));

module.exports = router;