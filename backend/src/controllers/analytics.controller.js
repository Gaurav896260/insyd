const DeadStockService = require("../services/deadStock.service");
const Sale = require("../models/Sale");

exports.getDeadStockReport = async (req, res, next) => {
  try {
    const report = await DeadStockService.getCategorizedStock();
    const filtered = report.filter((i) => i.status !== "Active");
    res.status(200).json({ success: true, data: filtered });
  } catch (error) {
    next(error);
  }
};

exports.getFastMovingItems = async (req, res, next) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const fastMoving = await Sale.aggregate([
      { $match: { soldAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: "$sku", totalSold: { $sum: "$quantitySold" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
    ]);
    res.status(200).json({ success: true, data: fastMoving });
  } catch (error) {
    next(error);
  }
};
