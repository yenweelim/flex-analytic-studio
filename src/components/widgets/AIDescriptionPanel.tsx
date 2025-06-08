
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot } from 'lucide-react';

interface AIDescriptionPanelProps {
  description: string;
  isGenerating: boolean;
  isVisible: boolean;
}

export const AIDescriptionPanel: React.FC<AIDescriptionPanelProps> = ({
  description,
  isGenerating,
  isVisible
}) => {
  if (!isVisible || (!description && !isGenerating)) return null;

  return (
    <Card className="ai-description-panel bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI Insights</span>
        </div>
        <div className="text-sm text-muted-foreground min-h-[40px]">
          {description}
          {isGenerating && (
            <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
