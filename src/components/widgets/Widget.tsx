
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, GripVertical, Settings, X, Sparkles, Database } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

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

  const handleSettingsClick = () => {
    setIsFlipped(true);
  };

  const handleBackClick = () => {
    setIsFlipped(false);
  };

  return (
    <div className="h-full perspective-1000">
      <div className={cn(
        "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
        isFlipped ? "rotate-y-180" : ""
      )}>
        {/* Front side - Normal widget view */}
        <Card className={cn("absolute inset-0 h-full shadow-md backface-hidden", className)}>
          <CardHeader className="p-3 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <CardTitle className="text-md font-medium">{title}</CardTitle>
              </div>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <ChevronDown className={cn("h-4 w-4 transition-transform", 
                    isCollapsed ? "" : "transform rotate-180"
                  )} />
                </Button>
                
                <Button 
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleSettingsClick}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <X className="h-4 w-4" />
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
          
          <CardContent className={cn("p-4 transition-all", 
            isCollapsed ? "h-0 p-0 overflow-hidden" : ""
          )}>
            {children}
          </CardContent>
        </Card>

        {/* Back side - Settings/Configuration view */}
        <Card className="absolute inset-0 h-full shadow-md backface-hidden rotate-y-180">
          <CardHeader className="p-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-medium">Configure Widget</CardTitle>
              <Button 
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleBackClick}
              >
                <X className="h-4 w-4" />
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
          <Sparkles className="h-3 w-3 mr-1" />
          AI
        </Button>
        <Button
          variant={mode === 'sql' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('sql')}
          className="flex-1"
        >
          <Database className="h-3 w-3 mr-1" />
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

      <div className="pt-2 border-t">
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
