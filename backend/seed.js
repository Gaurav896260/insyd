// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const InventoryItem = require('./src/models/InventoryItem');
const Sale = require('./src/models/Sale');
const { CATEGORIES, UNITS } = require('./src/utils/constants');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB for seeding...");
};

const materials = [
  { name: 'UltraTech Cement', category: 'Cement', unit: 'bag', cost: 450 },
  { name: 'TATA Tiscon 12mm', category: 'Steel', unit: 'piece', cost: 800 },
  { name: 'JSW Neosteel', category: 'Steel', unit: 'piece', cost: 750 },
  { name: 'Asian Paints White 20L', category: 'Paint', unit: 'piece', cost: 3500 },
  { name: 'Kajaria Floor Tiles 2x2', category: 'Tiles', unit: 'piece', cost: 120 },
  { name: 'PVC Pipe 4 inch', category: 'Pipes', unit: 'meter', cost: 200 },
  { name: 'Dr. Fixit Waterproofing', category: 'Hardware', unit: 'piece', cost: 500 },
  { name: 'Birla White Wall Care', category: 'Cement', unit: 'bag', cost: 600 },
];

const seedData = async () => {
  try {
    // 1. Clear existing data
    await InventoryItem.deleteMany({});
    await Sale.deleteMany({});

    console.log("Old data cleared. Generating new data...");

    const items = [];
    for (const mat of materials) {
      // Create 3-4 variations of each material (different SKUs)
      for (let i = 1; i <= 3; i++) {
        const sku = `${mat.name.substring(0, 3).toUpperCase()}-${100 + i}`;
        
        // Randomize stock levels: some high, some dangerously low
        const quantity = Math.floor(Math.random() * 500);
        const reorderLevel = 50 + Math.floor(Math.random() * 50);

        const item = await InventoryItem.create({
          sku,
          name: `${mat.name} - Batch ${i}`,
          category: mat.category,
          unit: mat.unit,
          quantity,
          unitCost: mat.cost,
          reorderLevel,
          // Set some to have no sales at all (for Dead Stock testing)
          lastSoldAt: Math.random() > 0.3 ? null : new Date() 
        });
        items.push(item);
      }
    }

    // 2. Generate Random Sales
    console.log("Generating sales history...");
    for (const item of items) {
      // Fast Moving: Recent sales (last 30 days)
      const recentSalesCount = Math.floor(Math.random() * 15);
      for (let j = 0; j < recentSalesCount; j++) {
        const soldAt = new Date();
        soldAt.setDate(soldAt.getDate() - Math.floor(Math.random() * 25));
        
        await Sale.create({
          sku: item.sku,
          quantitySold: Math.floor(Math.random() * 20) + 1,
          soldAt,
          invoiceRef: `INV-${Math.floor(Math.random() * 9000) + 1000}`
        });
      }

      // Dead Stock/Slow Moving: Sales from 70-200 days ago
      if (Math.random() > 0.7) {
        const oldDate = new Date();
        oldDate.setDate(oldDate.getDate() - (70 + Math.floor(Math.random() * 130)));
        
        await Sale.create({
          sku: item.sku,
          quantitySold: 5,
          soldAt: oldDate,
          invoiceRef: `OLD-INV-${item.sku}`
        });
        
        // Update item lastSoldAt to trigger aging logic
        item.lastSoldAt = oldDate;
        await item.save();
      }
    }

    console.log(`Successfully seeded ${items.length} items and hundreds of sales!`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB().then(seedData);