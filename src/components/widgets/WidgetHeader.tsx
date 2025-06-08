
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, GripVertical, Settings, X, Wand2 } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface WidgetHeaderProps {
  title: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onMagicClick: () => void;
  onSettingsClick: () => void;
  onRemove: () => void;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  isCollapsed,
  onToggleCollapse,
  onMagicClick,
  onSettingsClick,
  onRemove
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="widget-drag-handle cursor-grab hover:cursor-grabbing">
          <GripVertical className="h-4 w-4" style={{ color: 'var(--font-secondary)' }} />
        </div>
        <h3 
          className="text-md font-medium font-h1"
          style={{ 
            color: 'var(--font-primary)',
            fontFamily: 'var(--font-h1)',
            fontWeight: 'var(--font-h1-weight)',
            fontSize: 'var(--font-h1-size)'
          }}
        >
          {title}
        </h3>
      </div>
      
      <div className="flex items-center gap-1 widget-controls">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 hover:bg-mina-bg"
          onClick={onToggleCollapse}
          style={{ backgroundColor: 'transparent' }}
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", 
            isCollapsed ? "" : "transform rotate-180"
          )} style={{ color: 'var(--purple-primary)' }} />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 hover:bg-mina-bg"
          onClick={onMagicClick}
          title="Generate AI Description"
          style={{ backgroundColor: 'transparent' }}
        >
          <Wand2 className="h-4 w-4" style={{ color: 'var(--purple-primary)' }} />
        </Button>
        
        <Button 
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-mina-bg"
          onClick={onSettingsClick}
          style={{ backgroundColor: 'transparent' }}
        >
          <Settings className="h-4 w-4" style={{ color: 'var(--purple-primary)' }} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 hover:bg-mina-bg"
              style={{ backgroundColor: 'transparent' }}
            >
              <X className="h-4 w-4" style={{ color: 'var(--semantic-error)' }} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" style={{ backgroundColor: 'var(--background-1)', border: `1px solid var(--outline-1)` }}>
            <DropdownMenuItem onClick={onRemove} style={{ color: 'var(--semantic-error)' }}>
              Remove Widget
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
