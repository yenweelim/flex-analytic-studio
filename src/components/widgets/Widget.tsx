
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, GripVertical, Settings, X } from 'lucide-react';
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
  className?: string;
  children?: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({
  id,
  title,
  type,
  onRemove,
  onConfigure,
  className,
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Card className={cn("h-full shadow-md", className)}>
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
              onClick={() => onConfigure(id)}
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
  );
};

export default Widget;
