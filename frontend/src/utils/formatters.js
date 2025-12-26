// src/utils/formatters.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const getStockStatus = (quantity, threshold) => {
  if (quantity <= 0) {
    // Critical: Solid Black
    return {
      label: "Out of Stock",
      color: "text-white bg-black border-black",
    };
  }
  if (quantity <= threshold) {
    // Warning: Dark Gray
    return {
      label: "Low Stock",
      color: "text-black bg-zinc-200 border-zinc-400",
    };
  }
  // Normal: Light Gray/White
  return {
    label: "In Stock",
    color: "text-zinc-500 bg-white border-zinc-200",
  };
};
