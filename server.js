
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mediaRoutes = require('./routes/media');
const importData = require('./utils/importData');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    importData(); // ← Load JSON into DB once on startup
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use('/api', mediaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
