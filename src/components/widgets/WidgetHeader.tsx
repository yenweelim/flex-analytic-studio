
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, GripVertical, Settings, X, Wand2, Edit3, Check, X as Cancel } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
  onRename?: (newTitle: string) => void;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  isCollapsed,
  onToggleCollapse,
  onMagicClick,
  onSettingsClick,
  onRemove,
  onRename
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditValue(title);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && onRename) {
      onRename(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditValue(title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="widget-drag-handle cursor-grab hover:cursor-grabbing">
          <GripVertical className="h-4 w-4" style={{ color: 'var(--font-secondary)' }} />
        </div>
        {isEditing ? (
          <div className="flex items-center gap-1 flex-1">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="h-7 text-sm px-2"
              style={{ 
                backgroundColor: 'var(--background-1)',
                borderColor: 'var(--outline-1)',
                color: 'var(--font-primary)'
              }}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleSaveEdit}
              style={{ backgroundColor: 'transparent' }}
            >
              <Check className="h-3 w-3" style={{ color: 'var(--semantic-confirm)' }} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleCancelEdit}
              style={{ backgroundColor: 'transparent' }}
            >
              <Cancel className="h-3 w-3" style={{ color: 'var(--semantic-error)' }} />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <h3 
              className="text-md font-medium font-h1 truncate"
              style={{ 
                color: 'var(--font-primary)',
                fontFamily: 'var(--font-h1)',
                fontWeight: 'var(--font-h1-weight)',
                fontSize: 'var(--font-h1-size)'
              }}
            >
              {title}
            </h3>
            {onRename && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleStartEdit}
                style={{ backgroundColor: 'transparent' }}
              >
                <Edit3 className="h-3 w-3" style={{ color: 'var(--purple-primary)' }} />
              </Button>
            )}
          </div>
        )}
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
