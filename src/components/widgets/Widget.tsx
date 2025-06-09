
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIDescriptionPanel } from './AIDescriptionPanel';
import { BulbIndicator } from './BulbIndicator';
import { WidgetHeader } from './WidgetHeader';
import { WidgetConfigurationPanel } from './WidgetConfigurationPanel';

export interface WidgetProps {
  id: string;
  title: string;
  type: string;
  onRemove: (id: string) => void;
  onConfigure: (id: string) => void;
  onUpdateWidget?: (id: string, config: any) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({
  id,
  title,
  type,
  onRemove,
  onConfigure,
  onUpdateWidget,
  className,
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAIDescription, setShowAIDescription] = useState(false);
  const [aiDescription, setAiDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showFloatingPanel, setShowFloatingPanel] = useState(false);
  const [isSmallWidget, setIsSmallWidget] = useState(false);
  const [autoGenerateAI, setAutoGenerateAI] = useState(true);
  const [widgetTitle, setWidgetTitle] = useState(title);
  
  const widgetRef = useRef<HTMLDivElement>(null);

  // Check if widget is too small to show AI description inline
  useEffect(() => {
    const checkSize = () => {
      if (widgetRef.current) {
        const rect = widgetRef.current.getBoundingClientRect();
        setIsSmallWidget(rect.height < 350 || rect.width < 400);
      }
    };

    checkSize();
    const resizeObserver = new ResizeObserver(checkSize);
    if (widgetRef.current) {
      resizeObserver.observe(widgetRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Auto-generate AI insights on mount/refresh when autoGenerateAI is enabled
  useEffect(() => {
    if (autoGenerateAI && !aiDescription) {
      handleMagicClick();
    }
  }, [autoGenerateAI]);

  const handleSettingsClick = () => {
    setIsFlipped(true);
  };

  const handleBackClick = () => {
    setIsFlipped(false);
  };

  const handleRename = (newTitle: string) => {
    setWidgetTitle(newTitle);
    if (onUpdateWidget) {
      onUpdateWidget(id, { title: newTitle });
    }
  };

  const handleMagicClick = async () => {
    setIsGenerating(true);
    setAiDescription('');

    // Always show floating panel for small widgets, inline for larger ones
    if (isSmallWidget) {
      setShowFloatingPanel(true);
    } else {
      setShowAIDescription(true);
    }

    // Simulate AI streaming text
    const descriptions = [
      "This chart provides valuable insights into your data patterns. ",
      "The visualization reveals trends that can help inform strategic decisions. ",
      "Key performance indicators are clearly displayed for easy analysis. ",
      "The data shows meaningful correlations that drive business value. ",
      "Interactive elements enhance the user experience and data exploration."
    ];

    for (let i = 0; i < descriptions.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAiDescription(prev => prev + descriptions[i]);
    }
    
    setIsGenerating(false);
  };

  return (
    <>
      <div 
        ref={widgetRef}
        className="h-full perspective-1000 group"
      >
        <div className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
          isFlipped ? "rotate-y-180" : ""
        )}>
          {/* Front side - Normal widget view */}
          <Card className={cn(
            "absolute inset-0 h-full shadow-md backface-hidden overflow-hidden transition-all duration-300",
            isCollapsed ? "h-auto" : "",
            className
          )}
                style={{ 
                  backgroundColor: 'var(--background-1)', 
                  border: `1px solid var(--outline-1)` 
                }}>
            <CardHeader className="p-3 pb-0 flex-shrink-0">
              <WidgetHeader
                title={widgetTitle}
                isCollapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                onMagicClick={handleMagicClick}
                onSettingsClick={handleSettingsClick}
                onRemove={() => onRemove(id)}
                onRename={handleRename}
              />
            </CardHeader>
            
            {!isCollapsed && (
              <CardContent className="p-4 transition-all widget-content flex-1 overflow-auto relative">
                <div className="h-full overflow-auto">
                  {children}
                </div>
                
                {/* AI Description Box - only show if not small widget and has enough space */}
                {showAIDescription && !isSmallWidget && (
                  <div className="mt-4 p-3 rounded-lg flex-shrink-0" 
                       style={{ 
                         backgroundColor: 'var(--mina-background)', 
                         border: `1px solid var(--outline-2)` 
                       }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4" style={{ color: 'var(--purple-primary)' }} />
                      <span 
                        className="text-sm font-medium font-h2"
                        style={{ 
                          color: 'var(--purple-primary)',
                          fontFamily: 'var(--font-h2)',
                          fontWeight: 'var(--font-h2-weight)',
                          fontSize: 'var(--font-h2-size)'
                        }}
                      >
                        AI Insights
                      </span>
                    </div>
                    <div 
                      className="text-sm min-h-[60px] font-body-1 max-h-[120px] overflow-y-auto"
                      style={{ 
                        color: 'var(--font-secondary)',
                        fontFamily: 'var(--font-body-1)',
                        fontWeight: 'var(--font-body-1-weight)',
                        fontSize: 'var(--font-body-1-size)'
                      }}
                    >
                      {aiDescription}
                      {isGenerating && (
                        <span 
                          className="inline-block w-2 h-4 ml-1 animate-pulse"
                          style={{ backgroundColor: 'var(--purple-primary)' }}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Bulb indicator for small widgets */}
                <BulbIndicator
                  description={aiDescription}
                  isGenerating={isGenerating}
                  isVisible={isSmallWidget && (aiDescription || isGenerating)}
                />
              </CardContent>
            )}
          </Card>

          {/* Back side - Settings/Configuration view */}
          <Card className="absolute inset-0 h-full shadow-md backface-hidden rotate-y-180 overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--background-1)', 
                  border: `1px solid var(--outline-1)` 
                }}>
            <CardHeader className="p-3 pb-2 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 
                  className="text-md font-medium font-h1"
                  style={{ 
                    color: 'var(--font-primary)',
                    fontFamily: 'var(--font-h1)',
                    fontWeight: 'var(--font-h1-weight)',
                    fontSize: 'var(--font-h1-size)'
                  }}
                >
                  Configure Widget
                </h3>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleBackClick}
                  style={{ 
                    backgroundColor: 'transparent',
                    color: 'var(--purple-primary)'
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 flex-1 min-h-0 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <WidgetConfigurationPanel 
                  widgetId={id}
                  widgetType={type}
                  widgetTitle={widgetTitle}
                  autoGenerateAI={autoGenerateAI}
                  onUpdateAutoGenerate={setAutoGenerateAI}
                  onUpdateWidget={onUpdateWidget}
                  onClose={handleBackClick}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Widget;
