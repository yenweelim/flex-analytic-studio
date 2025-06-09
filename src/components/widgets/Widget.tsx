
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIDescriptionPanel } from './AIDescriptionPanel';
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
  const [autoGenerateAI, setAutoGenerateAI] = useState(true); // Default to true
  
  const widgetRef = useRef<HTMLDivElement>(null);

  // Check if widget is too small to show AI description inline
  useEffect(() => {
    const checkSize = () => {
      if (widgetRef.current) {
        const rect = widgetRef.current.getBoundingClientRect();
        setIsSmallWidget(rect.height < 300); // Consider small if height < 300px
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

  const handleMagicClick = async () => {
    if (isSmallWidget) {
      setShowFloatingPanel(true);
    } else {
      setShowAIDescription(true);
    }
    
    setIsGenerating(true);
    setAiDescription('');

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

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (isSmallWidget && aiDescription) {
      setShowFloatingPanel(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isSmallWidget && !isGenerating) {
      setShowFloatingPanel(false);
    }
  };

  return (
    <>
      <div 
        ref={widgetRef}
        className="h-full perspective-1000"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
          isFlipped ? "rotate-y-180" : ""
        )}>
          {/* Front side - Normal widget view */}
          <Card className={cn("absolute inset-0 h-full shadow-md backface-hidden", className)}
                style={{ 
                  backgroundColor: 'var(--background-1)', 
                  border: `1px solid var(--outline-1)` 
                }}>
            <CardHeader className="p-3 pb-0">
              <WidgetHeader
                title={title}
                isCollapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                onMagicClick={handleMagicClick}
                onSettingsClick={handleSettingsClick}
                onRemove={() => onRemove(id)}
              />
            </CardHeader>
            
            <CardContent className={cn("p-4 transition-all widget-content", 
              isCollapsed ? "h-0 p-0 overflow-hidden" : ""
            )}>
              {children}
              
              {/* AI Description Box - only show if not small widget */}
              {showAIDescription && !isSmallWidget && (
                <div className="mt-4 p-3 rounded-lg" 
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
                    className="text-sm min-h-[60px] font-body-1"
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
            </CardContent>
          </Card>

          {/* Back side - Settings/Configuration view */}
          <Card className="absolute inset-0 h-full shadow-md backface-hidden rotate-y-180"
                style={{ 
                  backgroundColor: 'var(--background-1)', 
                  border: `1px solid var(--outline-1)` 
                }}>
            <CardHeader className="p-3 pb-2">
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
                  className="h-7 w-7 hover:bg-mina-bg"
                  onClick={handleBackClick}
                  style={{ backgroundColor: 'transparent' }}
                >
                  <X className="h-4 w-4" style={{ color: 'var(--purple-primary)' }} />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 h-full overflow-hidden">
              <WidgetConfigurationPanel 
                widgetId={id}
                widgetType={type}
                widgetTitle={title}
                autoGenerateAI={autoGenerateAI}
                onUpdateAutoGenerate={setAutoGenerateAI}
                onUpdateWidget={onUpdateWidget}
                onClose={handleBackClick}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating AI Description Panel */}
      <AIDescriptionPanel 
        description={aiDescription}
        isGenerating={isGenerating}
        isVisible={showFloatingPanel}
      />
    </>
  );
};

export default Widget;
