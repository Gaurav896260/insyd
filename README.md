# 🏗️ BuildStock: Construction Inventory Intelligence

BuildStock is a specialized inventory management system designed for construction material suppliers (Cement, Steel, Paint, etc.). Unlike generic ERPs, BuildStock focuses on **net margin protection** by identifying dead stock, preventing stockouts, and reconciling physical theft or damage.

---

## 📊 The Core Problem

Problem Analysis: The Reality of Indian Material Businesses

Most Indian material businesses (Cement, Steel, Paint) operate in high-chaos environments. Even those using "software" often find that their digital records are just a "guess" of what's actually in the warehouse.

1. The "Ground Reality" Problems

A. The "Ghost Stock" Trap (Physical vs. Digital Mismatch)

The Problem: In a busy yard, 10 bags of cement might get damaged by rain, or 5 steel rods might be misplaced. The "software" still shows them as available. A salesman promises them to a customer, takes the money, but when the truck arrives, the stock isn't there. This leads to refunds and lost trust.

How BuildStock Helps: The Audit & Reconciliation Module. It forces a periodic "Physical Sync." Instead of just trusting the computer, the manager count-checks and the system records the "Shrinkage" (theft/damage) as a cost, cleaning up the books instantly.

B. The "Working Capital" Hemorrhage

The Problem: Owners often keep buying "safe" items (like standard 12mm rods) while specialized items (like expensive waterproof paint) sit in a dark corner for a year. That paint is "Dead Capital." The owner thinks they are profitable, but their bank account is empty because all the profit is sitting as dust-covered inventory on a shelf.

How BuildStock Helps: Inventory Vitality Analytics. Your system flags anything older than 180 days. It tells the owner: "Stop buying Steel; sell this Paint at a 10% discount today to get your cash back."

C. The "Multi-Entry" Fatigue (Human Error)

The Problem: A sale happens. The clerk writes it in a book, then later types it into a computer. Sometimes they forget. Sometimes they subtract the stock but forget to log the payment. The data becomes "out of sync" within hours.

How BuildStock Helps: Atomic Transactions (ACID). In your code, the sale and the stock update are "locked" together. It’s impossible to have one without the other. This eliminates the "I forgot to update the stock" human error entirely.
---

## 🛠️ The Solution (Engineered Features)

### Atomic Sales Engine
Uses Mongoose Transactions (ACID) to ensure stock deduction and sale logging happen as a single unit of work.

### Scalable Inventory
Implements Server-Side Pagination & Filtering, allowing the system to handle 50,000+ SKUs with zero performance lag.

### Vitality Analytics
Automatically categorizes materials into "Active," "Slow-Moving," and "Dead Stock" based on movement velocity.

### Audit & Reconciliation
A dedicated module to log physical counts, calculate shrinkage, and update system stock with a full audit trail.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas or local instance

### Installation

1. **Clone the repositories** (Frontend & Backend)

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5001
   ```
   
   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Seed Data** (Recommended):
   ```bash
   node seed.js
   ```
   Populates inventory and sales history for testing analytics.

---

## 📡 API Endpoints (Architecture)

### Inventory
- `GET /api/inventory` - Fetches paginated items with search/category filters
- `POST /api/inventory` - Adds new materials with unique SKU validation

### Sales (Transaction Protected)
- `POST /api/sales` - Records a sale and atomically updates stock

### Analytics
- `GET /api/analytics/dead-stock` - Returns aging reports for capital management
- `GET /api/analytics/fast-moving` - Identifies top-selling SKUs by volume

### Audit
- `POST /api/audit` - Reconciles physical count vs. system count and logs the difference

---

## 💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15+, Tailwind CSS, Lucide React, Recharts |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB (NoSQL for flexible construction material schemas) |

---

## 📋 Key Assumptions

To maintain the scope of this implementation, the following assumptions were made:

- **Dead Stock Threshold**: Defined as items with no sale activity for 180 days; "Slow-Moving" is defined as 60 days
- **Lead Time**: Assumes a standard 7-day lead time for reorder calculations unless otherwise specified
- **Fixed Categories**: The system uses predefined categories (Cement, Steel, Tiles, etc.) to ensure data consistency in analytics
- **Atomic Updates**: Assumes all sales must be recorded against a valid SKU with sufficient stock

---

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.
