import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, GripVertical, Settings, X, Wand2, Bot } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AIDescriptionPanel } from './AIDescriptionPanel';

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
          <Card className={cn("absolute inset-0 h-full shadow-md backface-hidden bg-card border-primary/20", className)}>
            <CardHeader className="p-3 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="widget-drag-handle cursor-grab hover:cursor-grabbing">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-md font-medium text-primary">{title}</CardTitle>
                </div>
                
                <div className="flex items-center gap-1 widget-controls">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 hover:bg-primary/10"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform text-primary", 
                      isCollapsed ? "" : "transform rotate-180"
                    )} />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 hover:bg-primary/10"
                    onClick={handleMagicClick}
                    title="Generate AI Description"
                  >
                    <Wand2 className="h-4 w-4 text-primary" />
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-primary/10"
                    onClick={handleSettingsClick}
                  >
                    <Settings className="h-4 w-4 text-primary" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/10">
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onRemove(id)}>
                        Remove Widget
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className={cn("p-4 transition-all widget-content", 
              isCollapsed ? "h-0 p-0 overflow-hidden" : ""
            )}>
              {children}
              
              {/* AI Description Box - only show if not small widget */}
              {showAIDescription && !isSmallWidget && (
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">AI Insights</span>
                  </div>
                  <div className="text-sm text-muted-foreground min-h-[60px]">
                    {aiDescription}
                    {isGenerating && (
                      <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Back side - Settings/Configuration view */}
          <Card className="absolute inset-0 h-full shadow-md backface-hidden rotate-y-180 bg-card border-primary/20">
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md font-medium text-primary">Configure Widget</CardTitle>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-primary/10"
                  onClick={handleBackClick}
                >
                  <X className="h-4 w-4 text-primary" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 h-full overflow-hidden">
              <WidgetConfigurationPanel 
                widgetId={id}
                widgetType={type}
                widgetTitle={title}
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

// Configuration panel component
interface WidgetConfigurationPanelProps {
  widgetId: string;
  widgetType: string;
  widgetTitle: string;
  onUpdateWidget?: (id: string, config: any) => void;
  onClose: () => void;
}

const WidgetConfigurationPanel: React.FC<WidgetConfigurationPanelProps> = ({
  widgetId,
  widgetType,
  widgetTitle,
  onUpdateWidget,
  onClose
}) => {
  const [mode, setMode] = useState<'ai' | 'sql'>('ai');
  const [userInput, setUserInput] = useState('');
  const [sqlInput, setSqlInput] = useState('');
  const [autoGenerateAI, setAutoGenerateAI] = useState(false);

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Mode selection */}
      <div className="flex gap-2">
        <Button
          variant={mode === 'ai' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('ai')}
          className="flex-1"
        >
          <Bot className="h-3 w-3 mr-1" />
          AI
        </Button>
        <Button
          variant={mode === 'sql' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('sql')}
          className="flex-1"
        >
          <Settings className="h-3 w-3 mr-1" />
          SQL
        </Button>
      </div>

      {mode === 'ai' ? (
        <div className="space-y-3 flex-1">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Describe what you want to visualize:
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g., Show monthly sales trends..."
              className="w-full h-20 text-xs border rounded p-2 resize-none"
            />
          </div>
          <Button size="sm" className="w-full">
            Generate Chart
          </Button>
        </div>
      ) : (
        <div className="space-y-3 flex-1">
          <div>
            <label className="text-sm font-medium mb-1 block">
              SQL Query:
            </label>
            <textarea
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
              placeholder="SELECT month, revenue FROM sales..."
              className="w-full h-20 text-xs font-mono border rounded p-2 resize-none"
            />
          </div>
          <Button size="sm" className="w-full">
            Execute Query
          </Button>
        </div>
      )}

      {/* Auto-generate AI description setting */}
      <div className="pt-2 border-t">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium">Auto-generate AI insights</label>
          <Button
            variant={autoGenerateAI ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoGenerateAI(!autoGenerateAI)}
            className="h-6 text-xs"
          >
            {autoGenerateAI ? "ON" : "OFF"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Automatically generate AI descriptions when data refreshes
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClose}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Widget;
