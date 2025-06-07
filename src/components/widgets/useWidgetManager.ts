
import { useState, useCallback } from 'react';
import { WidgetData, AIWidgetConfig } from './types';
import { defaultLayouts } from './defaultLayouts';
import { ChartConfig } from '@/utils/chartUtils';

let widgetCounter = 1;

export const useWidgetManager = () => {
  // Initialize with some default widgets
  const [widgets, setWidgets] = useState<WidgetData[]>([
    { id: 'revenue-chart', title: 'Monthly Revenue', type: 'line' },
    { id: 'profit-chart', title: 'Revenue vs Profit', type: 'bar' },
    { id: 'category-pie', title: 'Sales by Category', type: 'pie' },
    { id: 'products-table', title: 'Product Inventory', type: 'table' },
  ]);
  
  const [layouts, setLayouts] = useState(defaultLayouts);
  
  const handleAddWidget = useCallback((type: string) => {
    if (type === 'ai') {
      return;
    }
    
    const newId = `widget-${widgetCounter++}`;
    const newTitle = type === 'table' ? 'Data Table' : `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`;
    
    // Add new widget to state
    setWidgets(prev => [...prev, { id: newId, title: newTitle, type }]);
    
    // Add layout item for the new widget
    const newLayout = {
      lg: [...layouts.lg, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
      md: [...layouts.md, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
      sm: [...layouts.sm, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
    };
    
    setLayouts(newLayout);
  }, [layouts]);

  const handleCreateAIWidget = useCallback((config: AIWidgetConfig) => {
    const newId = `ai-widget-${widgetCounter++}`;
    
    const newWidget: WidgetData = {
      id: newId,
      title: config.title,
      type: config.type,
      sql: config.sql,
      data: config.data,
      config: {
        type: config.type,
        dataKey: config.dataKey,
        secondaryDataKey: config.secondaryDataKey,
        title: config.title,
        xAxisKey: config.xAxisKey,
        colors: ['#9b87f5', '#7E69AB', '#4CAF50', '#FFC107'],
      }
    };
    
    setWidgets(prev => [...prev, newWidget]);
    
    // Add layout item for the new widget
    const newLayout = {
      lg: [...layouts.lg, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
      md: [...layouts.md, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
      sm: [...layouts.sm, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
    };
    
    setLayouts(newLayout);
  }, [layouts]);
  
  const handleRemoveWidget = useCallback((id: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== id));
    
    // Remove from layouts
    setLayouts(prev => ({
      lg: prev.lg.filter(item => item.i !== id),
      md: prev.md.filter(item => item.i !== id),
      sm: prev.sm.filter(item => item.i !== id),
    }));
  }, []);
  
  const handleUpdateConfig = useCallback((id: string, title: string, config: Partial<ChartConfig>) => {
    setWidgets(prev => prev.map(widget => {
      if (widget.id === id) {
        return {
          ...widget,
          title,
          config: {
            ...(widget.config || {}),
            ...config,
          } as ChartConfig,
        };
      }
      return widget;
    }));
  }, []);

  return {
    widgets,
    layouts,
    setLayouts,
    handleAddWidget,
    handleCreateAIWidget,
    handleRemoveWidget,
    handleUpdateConfig,
  };
};
