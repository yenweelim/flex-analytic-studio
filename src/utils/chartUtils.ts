
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
    colors: ['var(--graph-purple-1)', 'var(--graph-purple-2)'],
  },
  profitRevenue: {
    type: 'bar',
    dataKey: 'revenue',
    secondaryDataKey: 'profit',
    title: 'Revenue vs Profit',
    xAxisKey: 'month',
    colors: ['var(--graph-purple-1)', 'var(--graph-blue-1)'],
  },
  customers: {
    type: 'area',
    dataKey: 'customers',
    title: 'Monthly Customers',
    xAxisKey: 'month',
    colors: ['var(--graph-purple-2)'],
  },
  categories: {
    type: 'pie',
    dataKey: 'value',
    title: 'Sales by Category',
    xAxisKey: 'name',
    colors: ['var(--graph-purple-1)', 'var(--graph-purple-2)', 'var(--graph-blue-1)', 'var(--graph-blue-3)'],
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
  const predefinedColors = [
    'var(--graph-purple-1)',
    'var(--graph-purple-2)',
    'var(--graph-purple-3)',
    'var(--graph-blue-1)',
    'var(--graph-blue-2)',
    'var(--graph-blue-3)'
  ];
  return predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
};

export const generateChartColors = (count: number): string[] => {
  const baseColors = [
    'var(--graph-purple-1)',
    'var(--graph-purple-2)',
    'var(--graph-blue-1)',
    'var(--graph-blue-3)',
    'var(--graph-purple-3)',
    'var(--graph-blue-2)'
  ];
  
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }
  
  const colors = [...baseColors];
  for (let i = baseColors.length; i < count; i++) {
    colors.push(getRandomColor());
  }
  
  return colors;
};
