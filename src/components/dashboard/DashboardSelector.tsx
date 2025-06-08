
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { ChevronDown, Plus, Edit2, Trash2 } from 'lucide-react';
import { Dashboard } from '@/hooks/useDashboardManager';

interface DashboardSelectorProps {
  dashboards: Dashboard[];
  currentDashboard: Dashboard | undefined;
  onCreateDashboard: (name: string) => void;
  onRenameDashboard: (id: string, name: string) => void;
  onDeleteDashboard: (id: string) => void;
  onSwitchDashboard: (id: string) => void;
}

export const DashboardSelector: React.FC<DashboardSelectorProps> = ({
  dashboards,
  currentDashboard,
  onCreateDashboard,
  onRenameDashboard,
  onDeleteDashboard,
  onSwitchDashboard
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [renamingDashboard, setRenamingDashboard] = useState<Dashboard | null>(null);

  const handleCreateDashboard = () => {
    if (newDashboardName.trim()) {
      onCreateDashboard(newDashboardName.trim());
      setNewDashboardName('');
      setIsCreating(false);
    }
  };

  const handleRenameDashboard = () => {
    if (renamingDashboard && newDashboardName.trim()) {
      onRenameDashboard(renamingDashboard.id, newDashboardName.trim());
      setNewDashboardName('');
      setIsRenaming(false);
      setRenamingDashboard(null);
    }
  };

  const startRename = (dashboard: Dashboard) => {
    setRenamingDashboard(dashboard);
    setNewDashboardName(dashboard.name);
    setIsRenaming(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-xl font-semibold text-primary">
            {currentDashboard?.name || 'Select Dashboard'}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {dashboards.map(dashboard => (
            <DropdownMenuItem 
              key={dashboard.id}
              onClick={() => onSwitchDashboard(dashboard.id)}
              className="flex items-center justify-between"
            >
              <span className={dashboard.id === currentDashboard?.id ? 'font-medium' : ''}>
                {dashboard.name}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    startRename(dashboard);
                  }}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                {dashboards.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDashboard(dashboard.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Dashboard
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Dashboard Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Dashboard</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Dashboard name"
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateDashboard()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateDashboard} disabled={!newDashboardName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dashboard Dialog */}
      <Dialog open={isRenaming} onOpenChange={setIsRenaming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Dashboard</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Dashboard name"
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRenameDashboard()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenaming(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameDashboard} disabled={!newDashboardName.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
