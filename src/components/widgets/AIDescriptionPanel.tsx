
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
    <Card 
      className="ai-description-panel shadow-lg"
      style={{ 
        backgroundColor: 'var(--background-1)',
        border: `1px solid var(--outline-2)`,
        backdropFilter: 'blur(8px)'
      }}
    >
      <CardContent className="p-3">
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
          className="text-sm min-h-[40px] font-body-1"
          style={{ 
            color: 'var(--font-secondary)',
            fontFamily: 'var(--font-body-1)',
            fontWeight: 'var(--font-body-1-weight)',
            fontSize: 'var(--font-body-1-size)'
          }}
        >
          {description}
          {isGenerating && (
            <span 
              className="inline-block w-2 h-4 ml-1 animate-pulse"
              style={{ backgroundColor: 'var(--purple-primary)' }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
