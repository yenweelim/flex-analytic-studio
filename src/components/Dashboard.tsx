
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
    <div className="flex h-screen" style={{ backgroundColor: 'var(--background-2)' }}>
      {/* Main content - full width */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-6 sticky top-0 z-10" 
                style={{ 
                  backgroundColor: 'var(--background-1)', 
                  borderBottom: `1px solid var(--outline-1)`,
                  backdropFilter: 'blur(8px)'
                }}>
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
                <Button 
                  size="sm" 
                  className="flex items-center gap-1 font-h2"
                  style={{ 
                    backgroundColor: 'var(--purple-primary)', 
                    color: 'var(--font-alternate)',
                    fontFamily: 'var(--font-h2)',
                    fontWeight: 'var(--font-h2-weight)',
                    fontSize: 'var(--font-h2-size)'
                  }}
                >
                  <Plus className="h-4 w-4" /> Add Widget
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" style={{ backgroundColor: 'var(--background-1)', border: `1px solid var(--outline-1)` }}>
                <DropdownMenuItem onClick={handleShowAICreator} style={{ color: 'var(--font-primary)' }}>
                  <ChartLine className="h-4 w-4 mr-2" style={{ color: 'var(--purple-primary)' }} /> AI-Powered Widget
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddWidget('line')} style={{ color: 'var(--font-primary)' }}>
                  <ChartLine className="h-4 w-4 mr-2" style={{ color: 'var(--purple-primary)' }} /> Line Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddWidget('bar')} style={{ color: 'var(--font-primary)' }}>
                  <ChartBarBig className="h-4 w-4 mr-2" style={{ color: 'var(--purple-primary)' }} /> Bar Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddWidget('pie')} style={{ color: 'var(--font-primary)' }}>
                  <ChartPie className="h-4 w-4 mr-2" style={{ color: 'var(--purple-primary)' }} /> Pie Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddWidget('table')} style={{ color: 'var(--font-primary)' }}>
                  <Table2 className="h-4 w-4 mr-2" style={{ color: 'var(--purple-primary)' }} /> Data Table
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              size="sm" 
              variant="outline"
              className="font-h2"
              onClick={handleSaveLayout}
              style={{
                borderColor: 'var(--outline-1)',
                backgroundColor: 'var(--background-1)',
                color: 'var(--font-primary)',
                fontFamily: 'var(--font-h2)',
                fontWeight: 'var(--font-h2-weight)',
                fontSize: 'var(--font-h2-size)'
              }}
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
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50 chat-gradient"
        onClick={() => setIsChatOpen(true)}
        style={{
          background: 'var(--bubblechat-from-us)',
          color: 'var(--font-alternate)'
        }}
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
