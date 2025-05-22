
export interface SalesData {
  month: string;
  revenue: number;
  profit: number;
  customers: number;
}

export interface ProductData {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

export interface RegionData {
  name: string;
  value: number;
}

export interface KpiCard {
  title: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
}

// Sales data for line/bar charts
export const salesData: SalesData[] = [
  { month: 'Jan', revenue: 65000, profit: 12000, customers: 456 },
  { month: 'Feb', revenue: 72000, profit: 18000, customers: 521 },
  { month: 'Mar', revenue: 80000, profit: 20000, customers: 598 },
  { month: 'Apr', revenue: 69000, profit: 14500, customers: 435 },
  { month: 'May', revenue: 94000, profit: 23000, customers: 679 },
  { month: 'Jun', revenue: 102000, profit: 28000, customers: 725 },
  { month: 'Jul', revenue: 110000, profit: 30000, customers: 832 },
  { month: 'Aug', revenue: 125000, profit: 34000, customers: 917 },
  { month: 'Sep', revenue: 115000, profit: 31000, customers: 843 },
  { month: 'Oct', revenue: 105000, profit: 29000, customers: 781 },
  { month: 'Nov', revenue: 118000, profit: 32000, customers: 865 },
  { month: 'Dec', revenue: 132000, profit: 38000, customers: 954 },
];

// Product data for tables
export const productsData: ProductData[] = [
  { id: 1, name: 'Premium Laptop', category: 'Electronics', price: 1299, stock: 45, rating: 4.8 },
  { id: 2, name: 'Wireless Headphones', category: 'Audio', price: 249, stock: 112, rating: 4.5 },
  { id: 3, name: 'Smart Watch', category: 'Wearables', price: 399, stock: 78, rating: 4.6 },
  { id: 4, name: 'Ultra HD Monitor', category: 'Electronics', price: 549, stock: 34, rating: 4.7 },
  { id: 5, name: 'Bluetooth Speaker', category: 'Audio', price: 129, stock: 89, rating: 4.3 },
  { id: 6, name: 'Ergonomic Mouse', category: 'Accessories', price: 79, stock: 156, rating: 4.2 },
  { id: 7, name: 'Mechanical Keyboard', category: 'Accessories', price: 149, stock: 53, rating: 4.9 },
  { id: 8, name: 'Wireless Charger', category: 'Accessories', price: 59, stock: 241, rating: 4.0 },
  { id: 9, name: 'Fitness Tracker', category: 'Wearables', price: 129, stock: 104, rating: 4.4 },
  { id: 10, name: 'Tablet Pro', category: 'Electronics', price: 899, stock: 62, rating: 4.7 },
];

// Data for pie chart
export const categoryData: RegionData[] = [
  { name: 'Electronics', value: 45 },
  { name: 'Audio', value: 20 },
  { name: 'Wearables', value: 15 },
  { name: 'Accessories', value: 20 },
];

// KPI data
export const kpiData: KpiCard[] = [
  { title: 'Total Revenue', value: 1187000, change: 24.5, prefix: '$' },
  { title: 'Total Profit', value: 309500, change: 18.3, prefix: '$' },
  { title: 'Average Order Value', value: 458, change: 12.7, prefix: '$' },
  { title: 'Customer Satisfaction', value: 94, change: 5.3, suffix: '%' },
];

// Generate 30 days of data for detailed analytics
export const dailySalesData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  return {
    date: date.toISOString().split('T')[0],
    sales: Math.floor(Math.random() * 100) + 50,
    visitors: Math.floor(Math.random() * 1000) + 500,
    conversionRate: (Math.random() * 5 + 2).toFixed(2)
  };
});
