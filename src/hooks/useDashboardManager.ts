
import { useState, useEffect } from 'react';

export interface Dashboard {
  id: string;
  name: string;
  layouts: any;
  widgets: any[];
  createdAt: Date;
  updatedAt: Date;
}

export const useDashboardManager = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [currentDashboardId, setCurrentDashboardId] = useState<string>('');

  // Load dashboards from localStorage on mount
  useEffect(() => {
    const savedDashboards = localStorage.getItem('analytics-dashboards');
    if (savedDashboards) {
      const parsed = JSON.parse(savedDashboards);
      setDashboards(parsed);
      if (parsed.length > 0) {
        setCurrentDashboardId(parsed[0].id);
      }
    } else {
      // Create default dashboard
      const defaultDashboard: Dashboard = {
        id: 'default',
        name: 'Analytics Dashboard',
        layouts: {},
        widgets: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setDashboards([defaultDashboard]);
      setCurrentDashboardId('default');
    }
  }, []);

  // Save dashboards to localStorage whenever they change
  useEffect(() => {
    if (dashboards.length > 0) {
      localStorage.setItem('analytics-dashboards', JSON.stringify(dashboards));
    }
  }, [dashboards]);

  const currentDashboard = dashboards.find(d => d.id === currentDashboardId);

  const createDashboard = (name: string) => {
    const newDashboard: Dashboard = {
      id: `dashboard-${Date.now()}`,
      name,
      layouts: {},
      widgets: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setDashboards(prev => [...prev, newDashboard]);
    setCurrentDashboardId(newDashboard.id);
    return newDashboard;
  };

  const renameDashboard = (id: string, name: string) => {
    setDashboards(prev => prev.map(d => 
      d.id === id 
        ? { ...d, name, updatedAt: new Date() }
        : d
    ));
  };

  const deleteDashboard = (id: string) => {
    if (dashboards.length <= 1) return; // Don't delete last dashboard
    
    setDashboards(prev => prev.filter(d => d.id !== id));
    if (currentDashboardId === id) {
      const remaining = dashboards.filter(d => d.id !== id);
      setCurrentDashboardId(remaining[0]?.id || '');
    }
  };

  const updateDashboard = (id: string, updates: Partial<Dashboard>) => {
    setDashboards(prev => prev.map(d => 
      d.id === id 
        ? { ...d, ...updates, updatedAt: new Date() }
        : d
    ));
  };

  const switchDashboard = (id: string) => {
    setCurrentDashboardId(id);
  };

  return {
    dashboards,
    currentDashboard,
    currentDashboardId,
    createDashboard,
    renameDashboard,
    deleteDashboard,
    updateDashboard,
    switchDashboard
  };
};
