/**
 * Logic: reorderLevel = (avgDailySales * leadTime) + safetyBuffer
 * For this MVP, we assume constants, but in Prod, leadTime comes from Supplier Model
 */
class ReorderService {
  static calculateSuggestedReorder(
    avgDailySales,
    leadTimeDays = 7,
    bufferPercent = 0.2
  ) {
    const base = avgDailySales * leadTimeDays;
    const buffer = base * bufferPercent;
    return Math.ceil(base + buffer);
  }
}

module.exports = ReorderService;
