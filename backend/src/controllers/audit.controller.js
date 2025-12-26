const AuditLog = require("../models/AuditLog");
const InventoryItem = require("../models/InventoryItem");

exports.performAudit = async (req, res, next) => {
  const { sku, physicalQuantity, note } = req.body;
  try {
    const item = await InventoryItem.findOne({ sku });
    if (!item) return res.status(404).json({ message: "SKU not found" });

    const difference = physicalQuantity - item.quantity;

    const log = await AuditLog.create({
      sku,
      systemQuantity: item.quantity,
      physicalQuantity,
      difference,
      note,
    });

    // Optionally sync system quantity to physical count
    item.quantity = physicalQuantity;
    await item.save();

    res.status(201).json({ success: true, audit: log });
  } catch (error) {
    next(error);
  }
};
