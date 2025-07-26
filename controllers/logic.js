
const Media = require('../models/mediaModel');

exports.getFolders = async (req, res) => {
  try {
    const doc = await Media.findOne();
    const folderNames = Object.keys(doc.albums.photo_album)
      .concat(Object.keys(doc.albums.video_album));
    res.json(folderNames);
  } catch (err) {
    res.status(500).json({ error: "Error fetching folders" });
  }
};

exports.getAlbumByName = async (req, res) => {
  try {
    const name = req.params.name;
    const doc = await Media.findOne();
    const photo = doc.albums.photo_album[name];
    const video = doc.albums.video_album[name];
    res.json(photo || video || []);
  } catch (err) {
    res.status(500).json({ error: "Error fetching album content" });
  }
};

exports.searchRootFolder = async (req, res) => {
  try {
    const q = req.query.query;
    const doc = await Media.findOne({ name: q });
    res.json(doc || {});
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
};
