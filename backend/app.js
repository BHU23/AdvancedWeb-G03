const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./config');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

// Middleware setup
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/api', authMiddleware, apiRoutes);

// Connect to MongoDB
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
