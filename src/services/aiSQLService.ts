
// Mock AI service for SQL generation and chart recommendations
// In a real implementation, this would call an AI API like OpenAI or Claude

export interface SQLRecommendation {
  sql: string;
  chartType: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  dataKey: string;
  secondaryDataKey?: string;
  xAxisKey: string;
  reasoning: string;
}

export interface DatabaseSchema {
  tables: {
    name: string;
    columns: {
      name: string;
      type: string;
      description?: string;
    }[];
  }[];
}

// Mock database schema
export const mockSchema: DatabaseSchema = {
  tables: [
    {
      name: 'sales',
      columns: [
        { name: 'id', type: 'INTEGER', description: 'Unique sale ID' },
        { name: 'date', type: 'DATE', description: 'Sale date' },
        { name: 'amount', type: 'DECIMAL', description: 'Sale amount in USD' },
        { name: 'region', type: 'VARCHAR', description: 'Sales region' },
        { name: 'product_category', type: 'VARCHAR', description: 'Product category' },
        { name: 'customer_id', type: 'INTEGER', description: 'Customer ID' },
      ]
    },
    {
      name: 'products',
      columns: [
        { name: 'id', type: 'INTEGER', description: 'Product ID' },
        { name: 'name', type: 'VARCHAR', description: 'Product name' },
        { name: 'category', type: 'VARCHAR', description: 'Product category' },
        { name: 'price', type: 'DECIMAL', description: 'Product price' },
        { name: 'stock_quantity', type: 'INTEGER', description: 'Stock quantity' },
      ]
    },
    {
      name: 'customers',
      columns: [
        { name: 'id', type: 'INTEGER', description: 'Customer ID' },
        { name: 'name', type: 'VARCHAR', description: 'Customer name' },
        { name: 'email', type: 'VARCHAR', description: 'Customer email' },
        { name: 'registration_date', type: 'DATE', description: 'Registration date' },
        { name: 'region', type: 'VARCHAR', description: 'Customer region' },
      ]
    }
  ]
};

// Mock AI responses based on user input
const mockAIResponses: Record<string, SQLRecommendation> = {
  'sales by month': {
    sql: `SELECT 
      DATE_FORMAT(date, '%Y-%m') as month,
      SUM(amount) as total_sales
    FROM sales 
    WHERE date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
    GROUP BY DATE_FORMAT(date, '%Y-%m')
    ORDER BY month`,
    chartType: 'line',
    title: 'Monthly Sales Trend',
    dataKey: 'total_sales',
    xAxisKey: 'month',
    reasoning: 'Line chart is best for showing trends over time. Monthly grouping provides good granularity for sales analysis.'
  },
  'revenue by region': {
    sql: `SELECT 
      region,
      SUM(amount) as revenue
    FROM sales 
    GROUP BY region
    ORDER BY revenue DESC`,
    chartType: 'bar',
    title: 'Revenue by Region',
    dataKey: 'revenue',
    xAxisKey: 'region',
    reasoning: 'Bar chart is ideal for comparing values across different categories like regions.'
  },
  'sales by category': {
    sql: `SELECT 
      product_category as category,
      COUNT(*) as sales_count,
      SUM(amount) as total_revenue
    FROM sales 
    GROUP BY product_category`,
    chartType: 'pie',
    title: 'Sales Distribution by Category',
    dataKey: 'sales_count',
    xAxisKey: 'category',
    reasoning: 'Pie chart effectively shows the proportion of sales across different product categories.'
  },
  'monthly customers': {
    sql: `SELECT 
      DATE_FORMAT(registration_date, '%Y-%m') as month,
      COUNT(*) as new_customers
    FROM customers 
    WHERE registration_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
    GROUP BY DATE_FORMAT(registration_date, '%Y-%m')
    ORDER BY month`,
    chartType: 'area',
    title: 'Monthly New Customers',
    dataKey: 'new_customers',
    xAxisKey: 'month',
    reasoning: 'Area chart shows the cumulative growth pattern of customer acquisition over time.'
  }
};

export const generateSQLRecommendation = async (userInput: string): Promise<SQLRecommendation> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple keyword matching for demo - in real implementation, this would use AI
  const input = userInput.toLowerCase();
  
  for (const [key, recommendation] of Object.entries(mockAIResponses)) {
    if (input.includes(key) || key.includes(input)) {
      return recommendation;
    }
  }
  
  // Default fallback
  return {
    sql: `SELECT 
      DATE_FORMAT(date, '%Y-%m') as month,
      SUM(amount) as revenue
    FROM sales 
    GROUP BY DATE_FORMAT(date, '%Y-%m')
    ORDER BY month`,
    chartType: 'line',
    title: 'Generated Chart',
    dataKey: 'revenue',
    xAxisKey: 'month',
    reasoning: 'Based on your input, I recommend a line chart showing revenue trends over time.'
  };
};

// Mock data generation based on SQL
export const executeSQL = async (sql: string): Promise<any[]> => {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data based on SQL content
  if (sql.includes('DATE_FORMAT') && sql.includes('sales')) {
    return [
      { month: '2024-01', total_sales: 45000, revenue: 45000 },
      { month: '2024-02', total_sales: 52000, revenue: 52000 },
      { month: '2024-03', total_sales: 48000, revenue: 48000 },
      { month: '2024-04', total_sales: 61000, revenue: 61000 },
      { month: '2024-05', total_sales: 55000, revenue: 55000 },
      { month: '2024-06', total_sales: 67000, revenue: 67000 },
    ];
  }
  
  if (sql.includes('region')) {
    return [
      { region: 'North', revenue: 125000, sales_count: 450 },
      { region: 'South', revenue: 98000, sales_count: 380 },
      { region: 'East', revenue: 142000, sales_count: 520 },
      { region: 'West', revenue: 89000, sales_count: 310 },
    ];
  }
  
  if (sql.includes('product_category')) {
    return [
      { category: 'Electronics', sales_count: 35, total_revenue: 89000 },
      { category: 'Clothing', sales_count: 28, total_revenue: 45000 },
      { category: 'Home', sales_count: 22, total_revenue: 32000 },
      { category: 'Sports', sales_count: 15, total_revenue: 28000 },
    ];
  }
  
  if (sql.includes('customers')) {
    return [
      { month: '2024-01', new_customers: 120 },
      { month: '2024-02', new_customers: 135 },
      { month: '2024-03', new_customers: 148 },
      { month: '2024-04', new_customers: 162 },
      { month: '2024-05', new_customers: 178 },
      { month: '2024-06', new_customers: 195 },
    ];
  }
  
  // Default mock data
  return [
    { month: '2024-01', value: 100 },
    { month: '2024-02', value: 120 },
    { month: '2024-03', value: 110 },
  ];
};
