
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartConfig } from '@/utils/chartUtils';
import { salesData } from '@/data/sampleData';

interface WidgetConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
  widgetId: string;
  widgetType: string;
  widgetTitle: string;
  config?: ChartConfig;
  onUpdateConfig: (id: string, title: string, config: Partial<ChartConfig>) => void;
}

export const WidgetConfigurator: React.FC<WidgetConfiguratorProps> = ({
  isOpen,
  onClose,
  widgetId,
  widgetType,
  widgetTitle,
  config,
  onUpdateConfig
}) => {
  const [title, setTitle] = useState(widgetTitle);
  const [chartType, setChartType] = useState(config?.type || widgetType);
  const [dataKey, setDataKey] = useState(config?.dataKey || 'revenue');
  const [secondaryDataKey, setSecondaryDataKey] = useState(config?.secondaryDataKey || '');
  const [xAxisKey, setXAxisKey] = useState(config?.xAxisKey || 'month');
  
  // Get available data keys from sample data
  const availableDataKeys = salesData.length > 0 ? Object.keys(salesData[0]).filter(key => key !== xAxisKey) : [];
  
  const handleSave = () => {
    onUpdateConfig(widgetId, title, {
      type: chartType as 'line' | 'bar' | 'pie' | 'area',
      dataKey,
      secondaryDataKey: secondaryDataKey || undefined,
      title,
      xAxisKey,
      colors: config?.colors || ['#9b87f5', '#7E69AB', '#4CAF50', '#FFC107'],
    });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Configure Widget</SheetTitle>
          <SheetDescription>
            Customize how your widget looks and what data it displays.
          </SheetDescription>
        </SheetHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="widget-title" className="text-right">
              Title
            </Label>
            <Input
              id="widget-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          {(widgetType === 'line' || widgetType === 'bar' || widgetType === 'area') && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="chart-type" className="text-right">
                  Chart Type
                </Label>
                <Select
                  value={chartType}
                  onValueChange={(value) => setChartType(value)}
                >
                  <SelectTrigger className="col-span-3" id="chart-type">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="data-key" className="text-right">
                  Data Series
                </Label>
                <Select value={dataKey} onValueChange={setDataKey}>
                  <SelectTrigger className="col-span-3" id="data-key">
                    <SelectValue placeholder="Select data key" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDataKeys.map((key) => (
                      <SelectItem key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="secondary-data-key" className="text-right">
                  Second Series
                </Label>
                <Select
                  value={secondaryDataKey}
                  onValueChange={setSecondaryDataKey}
                >
                  <SelectTrigger className="col-span-3" id="secondary-data-key">
                    <SelectValue placeholder="None (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {availableDataKeys
                      .filter(key => key !== dataKey)
                      .map((key) => (
                        <SelectItem key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button onClick={handleSave}>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default WidgetConfigurator;
