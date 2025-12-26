const express = require("express");
const cors = require("cors");
const inventoryRoutes = require("./routes/inventory.routes");
const salesRoutes = require("./routes/sales.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const auditRoutes = require("./routes/audit.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// ALLOW ORIGINS FROM FRONTEND URL
const allowedOrigins = [process.env.FRONTEND_URL];
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

// Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/audit", auditRoutes);

// Error Handling
app.use(errorHandler);

module.exports = app;
