const InventoryItem = require("../models/InventoryItem");

exports.addItem = async (req, res, next) => {
  try {
    const item = await InventoryItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};
exports.getAllItems = async (req, res, next) => {
  try {
    // 1. Destructure query params with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { category, search } = req.query;

    // 2. Build Query Object
    let query = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } }
      ];
    }

    // 3. Execute query with pagination
    const items = await InventoryItem.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await InventoryItem.countDocuments(query);

    const results = items.map((item) => ({
      ...item._doc,
      isLowStock: item.quantity <= item.reorderLevel,
    }));

    res.status(200).json({
      success: true,
      count: results.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
exports.getItemBySku = async (req, res, next) => {
  try {
    const item = await InventoryItem.findOne({ sku: req.params.sku });
    if (!item)
      return res.status(404).json({ success: false, message: "SKU not found" });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    const item = await InventoryItem.findOneAndUpdate(
      { sku: req.params.sku },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};
