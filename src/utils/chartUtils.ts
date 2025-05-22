
import { SalesData, ProductData, RegionData } from '../data/sampleData';

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  dataKey: string;
  secondaryDataKey?: string;
  title: string;
  xAxisKey: string;
  colors: string[];
  stacked?: boolean;
}

export const defaultChartConfigs: Record<string, ChartConfig> = {
  revenue: {
    type: 'line',
    dataKey: 'revenue',
    title: 'Monthly Revenue',
    xAxisKey: 'month',
    colors: ['#9b87f5', '#7E69AB'],
  },
  profitRevenue: {
    type: 'bar',
    dataKey: 'revenue',
    secondaryDataKey: 'profit',
    title: 'Revenue vs Profit',
    xAxisKey: 'month',
    colors: ['#9b87f5', '#4CAF50'],
  },
  customers: {
    type: 'area',
    dataKey: 'customers',
    title: 'Monthly Customers',
    xAxisKey: 'month',
    colors: ['#7E69AB'],
  },
  categories: {
    type: 'pie',
    dataKey: 'value',
    title: 'Sales by Category',
    xAxisKey: 'name',
    colors: ['#9b87f5', '#7E69AB', '#6E59A5', '#4CAF50'],
  }
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getPercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateChartColors = (count: number): string[] => {
  const baseColors = ['#9b87f5', '#7E69AB', '#6E59A5', '#4CAF50', '#2196F3', '#FFC107', '#F44336'];
  
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }
  
  const colors = [...baseColors];
  for (let i = baseColors.length; i < count; i++) {
    colors.push(getRandomColor());
  }
  
  return colors;
};
