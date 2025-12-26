const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  sku: { type: String, required: true, index: true },
  quantitySold: { type: Number, required: true },
  soldAt: { type: Date, default: Date.now },
  invoiceRef: { type: String }
});

module.exports = mongoose.model('Sale', saleSchema);