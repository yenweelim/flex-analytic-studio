
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { AIDescriptionPanel } from './AIDescriptionPanel';

interface BulbIndicatorProps {
  description: string;
  isGenerating: boolean;
  isVisible: boolean;
}

export const BulbIndicator: React.FC<BulbIndicatorProps> = ({
  description,
  isGenerating,
  isVisible
}) => {
  const [showFloating, setShowFloating] = useState(false);

  if (!isVisible || (!description && !isGenerating)) return null;

  return (
    <>
      <div 
        className="absolute bottom-2 right-2 z-20"
        onMouseEnter={() => setShowFloating(true)}
        onMouseLeave={() => setShowFloating(false)}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full shadow-md"
          style={{ 
            backgroundColor: 'var(--purple-primary)',
            color: 'var(--font-alternate)'
          }}
        >
          <Lightbulb className="h-4 w-4" />
        </Button>
      </div>

      <AIDescriptionPanel 
        description={description}
        isGenerating={isGenerating}
        isVisible={showFloating}
      />
    </>
  );
};
