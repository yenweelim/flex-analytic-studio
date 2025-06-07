import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { ChartWidget } from './ChartWidget';
import { TableWidget } from './TableWidget';
import { WidgetConfigurator } from '../configurator/WidgetConfigurator';
import { AIWidgetCreator } from '../configurator/AIWidgetCreator';
import { ChartConfig } from '@/utils/chartUtils';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Default layouts for different screen sizes
const defaultLayouts = {
  lg: [
    { i: 'revenue-chart', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'profit-chart', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'category-pie', x: 0, y: 2, w: 4, h: 2, minW: 2, minH: 2 },
    { i: 'products-table', x: 4, y: 2, w: 8, h: 2, minW: 4, minH: 2 },
  ],
  md: [
    { i: 'revenue-chart', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'profit-chart', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'category-pie', x: 0, y: 2, w: 4, h: 2, minW: 2, minH: 2 },
    { i: 'products-table', x: 4, y: 2, w: 8, h: 2, minW: 4, minH: 2 },
  ],
  sm: [
    { i: 'revenue-chart', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'profit-chart', x: 0, y: 2, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'category-pie', x: 0, y: 4, w: 6, h: 2, minW: 2, minH: 2 },
    { i: 'products-table', x: 0, y: 6, w: 6, h: 2, minW: 4, minH: 2 },
  ],
};

interface WidgetData {
  id: string;
  title: string;
  type: string;
  config?: ChartConfig;
  sql?: string;
  data?: any[];
}

interface WidgetGridProps {
  onLayoutChange?: (layout: any) => void;
  onShowAICreator?: () => void;
}

interface WidgetGridRef {
  handleAddWidget: (type: string) => void;
  handleShowAICreator: () => void;
}

let widgetCounter = 1;

const WidgetGrid = forwardRef<WidgetGridRef, WidgetGridProps>(({ onLayoutChange, onShowAICreator }, ref) => {
  // Initialize with some default widgets
  const [widgets, setWidgets] = useState<WidgetData[]>([
    { id: 'revenue-chart', title: 'Monthly Revenue', type: 'line' },
    { id: 'profit-chart', title: 'Revenue vs Profit', type: 'bar' },
    { id: 'category-pie', title: 'Sales by Category', type: 'pie' },
    { id: 'products-table', title: 'Product Inventory', type: 'table' },
  ]);
  
  const [layouts, setLayouts] = useState(defaultLayouts);
  const [activeConfigWidget, setActiveConfigWidget] = useState<string | null>(null);
  const [showAICreator, setShowAICreator] = useState(false);
  
  // Find the widget currently being configured
  const activeWidget = activeConfigWidget ? widgets.find(w => w.id === activeConfigWidget) : null;
  
  const handleAddWidget = (type: string) => {
    if (type === 'ai') {
      setShowAICreator(true);
      return;
    }
    
    const newId = `widget-${widgetCounter++}`;
    const newTitle = type === 'table' ? 'Data Table' : `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`;
    
    // Add new widget to state
    setWidgets([...widgets, { id: newId, title: newTitle, type }]);
    
    // Add layout item for the new widget
    const newLayout = {
      lg: [...layouts.lg, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
      md: [...layouts.md, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
      sm: [...layouts.sm, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
    };
    
    setLayouts(newLayout);
  };

  const handleShowAICreatorInternal = () => {
    setShowAICreator(true);
  };

  // Expose functions to parent component
  useImperativeHandle(ref, () => ({
    handleAddWidget,
    handleShowAICreator: handleShowAICreatorInternal,
  }));

  const handleCreateAIWidget = useCallback((config: {
    title: string;
    type: 'line' | 'bar' | 'pie' | 'area';
    sql: string;
    data: any[];
    dataKey: string;
    secondaryDataKey?: string;
    xAxisKey: string;
  }) => {
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
    
    setWidgets([...widgets, newWidget]);
    
    // Add layout item for the new widget
    const newLayout = {
      lg: [...layouts.lg, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
      md: [...layouts.md, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
      sm: [...layouts.sm, { i: newId, x: 0, y: Infinity, w: 6, h: 2, minW: 3, minH: 2 }],
    };
    
    setLayouts(newLayout);
  }, [widgets, layouts]);
  
  // Expose the handleAddWidget function for parent components
  
  
  const handleRemoveWidget = useCallback((id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
    
    // Remove from layouts
    setLayouts({
      lg: layouts.lg.filter(item => item.i !== id),
      md: layouts.md.filter(item => item.i !== id),
      sm: layouts.sm.filter(item => item.i !== id),
    });
  }, [widgets, layouts]);
  
  const handleConfigureWidget = useCallback((id: string) => {
    setActiveConfigWidget(id);
  }, []);
  
  const handleUpdateConfig = useCallback((id: string, title: string, config: Partial<ChartConfig>) => {
    setWidgets(widgets.map(widget => {
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
  }, [widgets]);
  
  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts);
    if (onLayoutChange) {
      onLayoutChange(allLayouts);
    }
  };
  
  return (
    <div className="w-full">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={180}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
        useCSSTransforms={true}
        compactType="vertical"
        margin={[16, 16]}
      >
        {widgets.map(widget => (
          <div key={widget.id}>
            {widget.type === 'table' ? (
              <TableWidget
                id={widget.id}
                title={widget.title}
                onRemove={handleRemoveWidget}
                onConfigure={handleConfigureWidget}
              />
            ) : (
              <ChartWidget
                id={widget.id}
                title={widget.title}
                type={widget.type as 'line' | 'bar' | 'pie' | 'area'}
                config={widget.config}
                customData={widget.data}
                onRemove={handleRemoveWidget}
                onConfigure={handleConfigureWidget}
              />
            )}
          </div>
        ))}
      </ResponsiveGridLayout>
      
      <WidgetConfigurator
        isOpen={activeConfigWidget !== null}
        onClose={() => setActiveConfigWidget(null)}
        widgetId={activeWidget?.id || ''}
        widgetType={activeWidget?.type || ''}
        widgetTitle={activeWidget?.title || ''}
        config={activeWidget?.config}
        onUpdateConfig={handleUpdateConfig}
      />

      <AIWidgetCreator
        isOpen={showAICreator}
        onClose={() => setShowAICreator(false)}
        onCreateWidget={handleCreateAIWidget}
      />
    </div>
  );
});

WidgetGrid.displayName = 'WidgetGrid';

export default WidgetGrid;
