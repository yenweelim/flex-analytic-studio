
import React from 'react';
import Dashboard from '../components/Dashboard';
import { toast } from '@/components/ui/use-toast';

// Import CSS for react-grid-layout
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Index = () => {
  const handleSaveLayout = () => {
    // In a real app, we would save the layout to a database or local storage
    toast({
      title: "Layout saved",
      description: "Your dashboard layout has been saved successfully.",
    });
  };
  
  return <Dashboard onSaveLayout={handleSaveLayout} />;
};

export default Index;
