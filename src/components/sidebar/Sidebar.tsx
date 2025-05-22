
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ChartColumnBig,
  Gauge,
  Layout,
  LayoutDashboard,
  Menu,
  PlusCircle,
  Settings,
  ChartLine,
  Table2,
  ChartPie
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onAddWidget: (type: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddWidget }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar fixed left-0 top-0 z-30 flex flex-col overflow-y-auto border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2 font-semibold text-xl text-sidebar-foreground">
            <ChartColumnBig className="h-6 w-6 text-analytics-primary" />
            <span>AnalyticsPro</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0 text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Main Navigation */}
      <div className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          <Button 
            variant="ghost" 
            className={cn(
              "justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
              "bg-sidebar-accent text-sidebar-foreground"
            )}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            {!collapsed && <span>Dashboard</span>}
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <Layout className="mr-2 h-5 w-5" />
            {!collapsed && <span>Layouts</span>}
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <Gauge className="mr-2 h-5 w-5" />
            {!collapsed && <span>Analytics</span>}
          </Button>
        </nav>
      </div>
      
      {/* Add widgets section */}
      <div className="border-t border-sidebar-border py-4">
        {!collapsed && (
          <h4 className="mb-2 px-4 text-sm font-semibold text-sidebar-foreground/70">
            Add Widgets
          </h4>
        )}
        <nav className="grid gap-1 px-2">
          <Button 
            variant="ghost" 
            className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={() => onAddWidget('line')}
          >
            <ChartLine className="mr-2 h-5 w-5" />
            {!collapsed && <span>Line Chart</span>}
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={() => onAddWidget('bar')}
          >
            <ChartColumnBig className="mr-2 h-5 w-5" />
            {!collapsed && <span>Bar Chart</span>}
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={() => onAddWidget('pie')}
          >
            <ChartPie className="mr-2 h-5 w-5" />
            {!collapsed && <span>Pie Chart</span>}
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={() => onAddWidget('table')}
          >
            <Table2 className="mr-2 h-5 w-5" />
            {!collapsed && <span>Data Table</span>}
          </Button>
        </nav>
      </div>
      
      {/* Footer */}
      <div className="mt-auto border-t border-sidebar-border py-4">
        <nav className="grid gap-1 px-2">
          <Button 
            variant="ghost" 
            className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <Settings className="mr-2 h-5 w-5" />
            {!collapsed && <span>Settings</span>}
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
