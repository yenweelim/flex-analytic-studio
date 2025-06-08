
import React, { useState, useEffect } from 'react';
import WidgetGrid from './widgets/WidgetGrid';
import { Button } from '@/components/ui/button';
import { ChartLine, ChartBarBig, ChartColumnBig, ChartPie, Table2, Plus, MessageCircle } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChatPanel } from './chat/ChatPanel';
import { DashboardSelector } from './dashboard/DashboardSelector';
import { useDashboardManager } from '@/hooks/useDashboardManager';
import { toast } from '@/components/ui/use-toast';

interface DashboardProps {
  onSaveLayout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSaveLayout }) => {
  const [widgetGridKey, setWidgetGridKey] = React.useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const widgetGridRef = React.useRef<any>(null);
  
  const {
    dashboards,
    currentDashboard,
    createDashboard,
    renameDashboard,
    deleteDashboard,
    switchDashboard,
    updateDashboard
  } = useDashboardManager();
  
  const handleAddWidget = (type: string) => {
    if (widgetGridRef.current?.handleAddWidget) {
      widgetGridRef.current.handleAddWidget(type);
    }
  };

  const handleShowAICreator = () => {
    if (widgetGridRef.current?.handleShowAICreator) {
      widgetGridRef.current.handleShowAICreator();
    }
  };

  const handleSaveLayout = () => {
    if (currentDashboard && onSaveLayout) {
      onSaveLayout();
      toast({
        title: "Layout saved",
        description: `${currentDashboard.name} layout has been saved successfully.`,
      });
    }
  };

  const handleLayoutChange = (layouts: any) => {
    if (currentDashboard) {
      updateDashboard(currentDashboard.id, { layouts });
    }
  };
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 to-secondary/10">
      {/* Main content - full width */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-primary/20 h-14 flex items-center justify-between px-6 sticky top-0 z-10">
          <DashboardSelector
            dashboards={dashboards}
            currentDashboard={currentDashboard}
            onCreateDashboard={createDashboard}
            onRenameDashboard={renameDashboard}
            onDeleteDashboard={deleteDashboard}
            onSwitchDashboard={switchDashboard}
          />
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="flex items-center gap-1 bg-primary hover:bg-primary/90">
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
              className="border-primary/20 hover:bg-primary/10"
              onClick={handleSaveLayout}
            >
              Save Layout
            </Button>
          </div>
        </header>
        
        {/* Main dashboard content */}
        <main className="flex-1 overflow-auto p-6">
          <WidgetGrid 
            key={`${widgetGridKey}-${currentDashboard?.id}`}
            onShowAICreator={handleShowAICreator}
            onLayoutChange={handleLayoutChange}
            ref={widgetGridRef}
          />
        </main>
      </div>

      {/* Floating Chat Button */}
      <Button
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="h-5 w-5" />
      </Button>

      {/* Chat Panel */}
      <ChatPanel 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
