
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
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-xl font-semibold hover:bg-mina-bg"
            style={{ 
              color: '#262626',
              fontFamily: 'var(--font-h1)',
              fontWeight: 'var(--font-h1-weight)',
              fontSize: 'var(--font-h1-size)'
            }}
          >
            {currentDashboard?.name || 'Select Dashboard'}
            <ChevronDown className="h-4 w-4" style={{ color: 'var(--purple-primary)' }} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-64"
          style={{ 
            backgroundColor: 'var(--background-1)', 
            border: `1px solid var(--outline-1)` 
          }}
        >
          {dashboards.map(dashboard => (
            <DropdownMenuItem 
              key={dashboard.id}
              onClick={() => onSwitchDashboard(dashboard.id)}
              className="flex items-center justify-between hover:bg-mina-bg"
              style={{ color: 'var(--font-primary)' }}
            >
              <span className={dashboard.id === currentDashboard?.id ? 'font-medium' : ''}>
                {dashboard.name}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-mina-bg"
                  onClick={(e) => {
                    e.stopPropagation();
                    startRename(dashboard);
                  }}
                >
                  <Edit2 className="h-3 w-3" style={{ color: 'var(--purple-primary)' }} />
                </Button>
                {dashboards.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-mina-bg"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDashboard(dashboard.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" style={{ color: 'var(--semantic-error)' }} />
                  </Button>
                )}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator style={{ backgroundColor: 'var(--outline-1)' }} />
          <DropdownMenuItem 
            onClick={() => setIsCreating(true)}
            className="hover:bg-mina-bg"
            style={{ color: 'var(--font-primary)' }}
          >
            <Plus className="h-4 w-4 mr-2" style={{ color: 'var(--purple-primary)' }} />
            New Dashboard
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Dashboard Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent style={{ backgroundColor: 'var(--background-1)', border: `1px solid var(--outline-1)` }}>
          <DialogHeader>
            <DialogTitle 
              style={{ 
                color: 'var(--font-primary)',
                fontFamily: 'var(--font-h1)',
                fontWeight: 'var(--font-h1-weight)',
                fontSize: 'var(--font-h1-size)'
              }}
            >
              Create New Dashboard
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Dashboard name"
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateDashboard()}
              style={{ 
                backgroundColor: 'var(--background-1)',
                borderColor: 'var(--outline-1)',
                color: 'var(--font-primary)'
              }}
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreating(false)}
              style={{
                borderColor: 'var(--outline-1)',
                backgroundColor: 'var(--background-1)',
                color: 'var(--font-primary)'
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateDashboard} 
              disabled={!newDashboardName.trim()}
              style={{ 
                backgroundColor: 'var(--purple-primary)', 
                color: 'var(--font-alternate)'
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dashboard Dialog */}
      <Dialog open={isRenaming} onOpenChange={setIsRenaming}>
        <DialogContent style={{ backgroundColor: 'var(--background-1)', border: `1px solid var(--outline-1)` }}>
          <DialogHeader>
            <DialogTitle
              style={{ 
                color: 'var(--font-primary)',
                fontFamily: 'var(--font-h1)',
                fontWeight: 'var(--font-h1-weight)',
                fontSize: 'var(--font-h1-size)'
              }}
            >
              Rename Dashboard
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Dashboard name"
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRenameDashboard()}
              style={{ 
                backgroundColor: 'var(--background-1)',
                borderColor: 'var(--outline-1)',
                color: 'var(--font-primary)'
              }}
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRenaming(false)}
              style={{
                borderColor: 'var(--outline-1)',
                backgroundColor: 'var(--background-1)',
                color: 'var(--font-primary)'
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRenameDashboard} 
              disabled={!newDashboardName.trim()}
              style={{ 
                backgroundColor: 'var(--purple-primary)', 
                color: 'var(--font-alternate)'
              }}
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
