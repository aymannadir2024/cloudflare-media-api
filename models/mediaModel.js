
const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model("Media", MediaSchema);
