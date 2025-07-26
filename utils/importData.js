
const fs = require('fs');
const Media = require('../models/mediaModel');

module.exports = async () => {
  try {
    const count = await Media.countDocuments();
    if (count === 0) {
      const raw = fs.readFileSync("./cloudflare_albums_output.json");
      const json = JSON.parse(raw);
      await Media.create(json);
      console.log("✅ Imported JSON to MongoDB");
    } else {
      console.log("ℹ️ Media already exists in DB, skipping import.");
    }
  } catch (err) {
    console.error("❌ Error importing JSON:", err);
  }
};
