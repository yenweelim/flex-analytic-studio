import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart,
  BarChart, 
  PieChart,
  Line, 
  Bar, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Widget } from './Widget';
import { salesData, categoryData } from '@/data/sampleData';
import { ChartConfig, defaultChartConfigs } from '@/utils/chartUtils';

interface ChartWidgetProps {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  config?: ChartConfig;
  customData?: any[];
  onRemove: (id: string) => void;
  onConfigure: (id: string) => void;
  onUpdateWidget?: (id: string, config: any) => void;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({
  id,
  title,
  type,
  config,
  customData,
  onRemove,
  onConfigure,
  onUpdateWidget
}) => {
  // Use the provided config or fallback to a default based on type
  const chartConfig = config || defaultChartConfigs[
    type === 'line' ? 'revenue' : 
    type === 'bar' ? 'profitRevenue' : 
    type === 'pie' ? 'categories' :
    'customers'
  ];

  // Use custom data if provided, otherwise fall back to default sample data
  const chartData = customData || (type === 'pie' ? categoryData : salesData);
  
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-2)" />
              <XAxis 
                dataKey={chartConfig.xAxisKey} 
                tick={{ fill: 'var(--font-primary)' }}
                axisLine={{ stroke: 'var(--outline-1)' }}
                tickLine={{ stroke: 'var(--outline-1)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--font-primary)' }}
                axisLine={{ stroke: 'var(--outline-1)' }}
                tickLine={{ stroke: 'var(--outline-1)' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip formatter={(value) => [`$${value}`, chartConfig.dataKey]} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={chartConfig.dataKey} 
                stroke={chartConfig.colors[0]} 
                strokeWidth={2}
                dot={{ r: 3, fill: chartConfig.colors[0] }}
                activeDot={{ r: 5 }}
              />
              {chartConfig.secondaryDataKey && (
                <Line 
                  type="monotone" 
                  dataKey={chartConfig.secondaryDataKey} 
                  stroke={chartConfig.colors[1]} 
                  strokeWidth={2}
                  dot={{ r: 3, fill: chartConfig.colors[1] }}
                  activeDot={{ r: 5 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-2)" />
              <XAxis 
                dataKey={chartConfig.xAxisKey}
                tick={{ fill: 'var(--font-primary)' }}
                axisLine={{ stroke: 'var(--outline-1)' }}
                tickLine={{ stroke: 'var(--outline-1)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--font-primary)' }}
                axisLine={{ stroke: 'var(--outline-1)' }}
                tickLine={{ stroke: 'var(--outline-1)' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Legend />
              <Bar 
                dataKey={chartConfig.dataKey} 
                fill={chartConfig.colors[0]} 
                radius={[4, 4, 0, 0]}
              />
              {chartConfig.secondaryDataKey && (
                <Bar 
                  dataKey={chartConfig.secondaryDataKey} 
                  fill={chartConfig.colors[1]} 
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <Pie
                data={chartData}
                dataKey={chartConfig.dataKey}
                nameKey={chartConfig.xAxisKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                fill={chartConfig.colors[0]}
                paddingAngle={5}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={chartConfig.colors[index % chartConfig.colors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-2)" />
              <XAxis 
                dataKey={chartConfig.xAxisKey}
                tick={{ fill: 'var(--font-primary)' }}
                axisLine={{ stroke: 'var(--outline-1)' }}
                tickLine={{ stroke: 'var(--outline-1)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--font-primary)' }}
                axisLine={{ stroke: 'var(--outline-1)' }}
                tickLine={{ stroke: 'var(--outline-1)' }}
              />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey={chartConfig.dataKey} 
                stroke={chartConfig.colors[0]} 
                fillOpacity={0.3}
                fill={chartConfig.colors[0]}
                strokeWidth={2}
              />
              {chartConfig.secondaryDataKey && (
                <Area 
                  type="monotone" 
                  dataKey={chartConfig.secondaryDataKey} 
                  stroke={chartConfig.colors[1]} 
                  fillOpacity={0.3}
                  fill={chartConfig.colors[1]}
                  strokeWidth={2}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div>Unsupported chart type</div>;
    }
  };
  
  return (
    <Widget
      id={id}
      title={title}
      type={type}
      onRemove={onRemove}
      onConfigure={onConfigure}
      onUpdateWidget={onUpdateWidget}
    >
      {renderChart()}
    </Widget>
  );
};

export default ChartWidget;
