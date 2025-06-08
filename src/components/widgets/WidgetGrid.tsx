
import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { ChartWidget } from './ChartWidget';
import { TableWidget } from './TableWidget';
import { WidgetConfigurator } from '../configurator/WidgetConfigurator';
import { AIWidgetCreator } from '../configurator/AIWidgetCreator';
import { WidgetGridProps, WidgetGridRef } from './types';
import { useWidgetManager } from './useWidgetManager';

const ResponsiveGridLayout = WidthProvider(Responsive);

const WidgetGrid = forwardRef<WidgetGridRef, WidgetGridProps>(({ onLayoutChange, onShowAICreator }, ref) => {
  const {
    widgets,
    layouts,
    setLayouts,
    handleAddWidget,
    handleCreateAIWidget,
    handleRemoveWidget,
    handleUpdateConfig,
  } = useWidgetManager();
  
  const [activeConfigWidget, setActiveConfigWidget] = useState<string | null>(null);
  const [showAICreator, setShowAICreator] = useState(false);
  
  // Find the widget currently being configured
  const activeWidget = activeConfigWidget ? widgets.find(w => w.id === activeConfigWidget) : null;

  const handleShowAICreatorInternal = () => {
    setShowAICreator(true);
  };

  // Expose functions to parent component
  useImperativeHandle(ref, () => ({
    handleAddWidget,
    handleShowAICreator: handleShowAICreatorInternal,
  }));
  
  const handleConfigureWidget = useCallback((id: string) => {
    setActiveConfigWidget(id);
  }, []);
  
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
          <div key={widget.id} className="react-grid-item">
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
