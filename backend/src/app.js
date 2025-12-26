const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventory.routes');
const salesRoutes = require('./routes/sales.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const auditRoutes = require('./routes/audit.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/audit', auditRoutes);

// Error Handling
app.use(errorHandler);

module.exports = app;