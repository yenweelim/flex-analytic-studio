
import React from 'react';
import WidgetGrid from './widgets/WidgetGrid';
import { Sidebar } from './sidebar/Sidebar';
import { Button } from '@/components/ui/button';
import { ChartLine, ChartBarBig, ChartColumnBig, ChartPie, Table2, Plus } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardProps {
  onSaveLayout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSaveLayout }) => {
  const [sidebarContent, setSidebarContent] = React.useState<boolean>(true);
  const [widgetGridKey, setWidgetGridKey] = React.useState<number>(0);
  const widgetGridRef = React.useRef<any>(null);
  
  const handleAddWidget = (type: string) => {
    // Trigger the add widget function on the WidgetGrid through ref
    if (widgetGridRef.current?.handleAddWidget) {
      widgetGridRef.current.handleAddWidget(type);
    }
  };

  const handleShowAICreator = () => {
    if (widgetGridRef.current?.handleShowAICreator) {
      widgetGridRef.current.handleShowAICreator();
    }
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar onAddWidget={handleAddWidget} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col pl-64">
        {/* Top bar */}
        <header className="bg-white border-b h-14 flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Widget
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShowAICreator}>
                  <ChartLine className="h-4 w-4 mr-2" /> AI-Powered Widget
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddWidget('line')}>
                  <ChartLine className="h-4 w-4 mr-2" /> Line Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddWidget('bar')}>
                  <ChartBarBig className="h-4 w-4 mr-2" /> Bar Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddWidget('pie')}>
                  <ChartPie className="h-4 w-4 mr-2" /> Pie Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddWidget('table')}>
                  <Table2 className="h-4 w-4 mr-2" /> Data Table
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                if (onSaveLayout) onSaveLayout();
              }}
            >
              Save Layout
            </Button>
          </div>
        </header>
        
        {/* Main dashboard content */}
        <main className="flex-1 overflow-auto p-6">
          <WidgetGrid 
            key={widgetGridKey} 
            onShowAICreator={handleShowAICreator}
            ref={widgetGridRef}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
