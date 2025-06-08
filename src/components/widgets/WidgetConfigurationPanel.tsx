
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Settings } from 'lucide-react';

interface WidgetConfigurationPanelProps {
  widgetId: string;
  widgetType: string;
  widgetTitle: string;
  onUpdateWidget?: (id: string, config: any) => void;
  onClose: () => void;
}

export const WidgetConfigurationPanel: React.FC<WidgetConfigurationPanelProps> = ({
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
