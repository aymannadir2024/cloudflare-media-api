
const express = require('express');
const router = express.Router();
const { getFolders, getAlbumByName, searchRootFolder } = require('../controllers/logic');

router.get('/folders', getFolders);
router.get('/albums/:name', getAlbumByName);
router.get('/search', searchRootFolder);

module.exports = router;
