
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

    // تقسيم المسار: video_album/album_1 → ['video_album', 'album_1']
    const [type, albumName] = name.split('/');

    if (!type || !albumName) {
      return res.status(400).json({ error: "Invalid album path" });
    }

    const album = doc.albums[type]?.[albumName];

    if (!album) {
      return res.json([]); // لا يوجد محتوى
    }

    res.json(album);
  } catch (err) {
    console.error("Album fetch error:", err);
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
