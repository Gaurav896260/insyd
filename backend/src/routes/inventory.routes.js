const express = require("express");
const router = express.Router();
const {
  addItem,
  getAllItems,
  getItemBySku,
  updateStock,
} = require("../controllers/inventory.controller");

router.route("/").post(addItem).get(getAllItems);
router.route("/:sku").get(getItemBySku).put(updateStock);

module.exports = router;
