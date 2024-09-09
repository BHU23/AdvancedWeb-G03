const express = require('express');
const app = express();
const config = require('./config');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

// Middleware setup
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/api', authMiddleware, apiRoutes);

const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
