BuildStock: Construction Inventory Intelligence
BuildStock is a specialized inventory management system designed for construction material suppliers (Cement, Steel, Paint, etc.). Unlike generic ERPs, BuildStock focuses on net margin protection by identifying dead stock, preventing stockouts, and reconciling physical theft or damage.

🏗 The Core Problem
Most construction businesses suffer from three "invisible" margin killers:

Capital Stagnation: Money frozen in "Dead Stock" (materials with no sales for 180+ days).

Inconsistent Data: Stock updates and sale records often fall out of sync during high-volume periods.

Stock Shrinkage: High rates of theft and site damage leading to "ghost inventory" where digital records don't match reality.

🛠 The Solution (Engineered Features)
Atomic Sales Engine: Uses Mongoose Transactions (ACID) to ensure stock deduction and sale logging happen as a single unit of work.

Scalable Inventory: Implements Server-Side Pagination & Filtering, allowing the system to handle 50,000+ SKUs with zero performance lag.

Vitality Analytics: Automatically categorizes materials into "Active," "Slow-Moving," and "Dead Stock" based on movement velocity.

Audit & Reconciliation: A dedicated module to log physical counts, calculate shrinkage, and update system stock with a full audit trail.

🚀 Getting Started
Prerequisites
Node.js (v18+)

MongoDB Atlas or local instance

Installation
Clone the repositories (Frontend & Backend).

Backend Setup:

Bash

cd backend
npm install

# Create a .env file with:

# MONGODB_URI=your_mongodb_connection_string

# PORT=5001

npm run dev
Frontend Setup:

Bash

cd frontend
npm install
npm run dev
Seed Data (Recommended):

Bash

node seed.js # Populates inventory and sales history for testing analytics
📡 API Endpoints (Architecture)
Inventory
GET /api/inventory: Fetches paginated items with search/category filters.

POST /api/inventory: Adds new materials with unique SKU validation.

Sales (Transaction Protected)
POST /api/sales: Records a sale and atomically updates stock.

Analytics
GET /api/analytics/dead-stock: Returns aging reports for capital management.

GET /api/analytics/fast-moving: Identifies top-selling SKUs by volume.

Audit
POST /api/audit: Reconciles physical count vs. system count and logs the difference.

🛠 Tech Stack
Frontend: Next.js 15+, Tailwind CSS, Lucide React, Recharts.

Backend: Node.js, Express.js, Mongoose.

Database: MongoDB (NoSQL for flexible construction material schemas).

Key Assumptions
To maintain the scope of this implementation, the following assumptions were made:

Dead Stock Threshold: Defined as items with no sale activity for 180 days; "Slow-Moving" is defined as 60 days.

Lead Time: Assumes a standard 7-day lead time for reorder calculations unless otherwise specified.

Fixed Categories: The system uses predefined categories (Cement, Steel, Tiles, etc.) to ensure data consistency in analytics.

Atomic Updates: Assumes all sales must be recorded against a valid SKU with sufficient stock.
