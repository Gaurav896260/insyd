const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  unitCost: { type: Number, required: true },
  reorderLevel: { type: Number, default: 10 },
  lastSoldAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);