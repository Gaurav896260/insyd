const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const InventoryItem = require("../models/InventoryItem");

exports.recordSale = async (req, res, next) => {
  const { sku, quantitySold, invoiceRef } = req.body;

  // Start a Client Session for the Transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const item = await InventoryItem.findOne({ sku }).session(session);
    if (!item) {
      await session.abortTransaction();
      return res.status(404).json({ message: "SKU not found" });
    }

    if (item.quantity < quantitySold) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Update Inventory
    item.quantity -= quantitySold;
    item.lastSoldAt = Date.now();
    await item.save({ session });

    // Create Sale Record
    const sale = await Sale.create([{ sku, quantitySold, invoiceRef }], {
      session,
    });

    // Commit all changes
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      remainingStock: item.quantity,
    });
  } catch (error) {
    // If anything fails, rollback database to original state
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};
