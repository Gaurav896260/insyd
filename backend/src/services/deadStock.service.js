const InventoryItem = require('../models/InventoryItem');
const { TIMEFRAMES } = require('../utils/constants');

class DeadStockService {
  static async getCategorizedStock() {
    const now = new Date();
    const slowThreshold = new Date(now.setDate(now.getDate() - TIMEFRAMES.SLOW_MOVING_DAYS));
    const deadThreshold = new Date(now.setDate(now.getDate() - TIMEFRAMES.DEAD_STOCK_DAYS));

    const items = await InventoryItem.find({});
    
    return items.map(item => {
      let status = 'Active';
      // If never sold, we use createdAt as reference
      const referenceDate = item.lastSoldAt || item.createdAt;

      if (referenceDate < deadThreshold) status = 'Dead Stock';
      else if (referenceDate < slowThreshold) status = 'Slow Moving';

      return { ...item._doc, status };
    });
  }
}

module.exports = DeadStockService;