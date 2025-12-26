const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  systemQuantity: { type: Number, required: true },
  physicalQuantity: { type: Number, required: true },
  difference: { type: Number, required: true },
  note: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);