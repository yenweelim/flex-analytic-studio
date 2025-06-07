
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lightbulb, Database } from 'lucide-react';
import { generateSQLRecommendation, executeSQL, mockSchema, type SQLRecommendation } from '@/services/aiSQLService';

interface AIWidgetCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWidget: (config: {
    title: string;
    type: 'line' | 'bar' | 'pie' | 'area';
    sql: string;
    data: any[];
    dataKey: string;
    secondaryDataKey?: string;
    xAxisKey: string;
  }) => void;
}

export const AIWidgetCreator: React.FC<AIWidgetCreatorProps> = ({
  isOpen,
  onClose,
  onCreateWidget
}) => {
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendation, setRecommendation] = useState<SQLRecommendation | null>(null);
  const [manualConfig, setManualConfig] = useState({
    title: '',
    chartType: 'line' as 'line' | 'bar' | 'pie' | 'area',
    sql: '',
  });

  const handleAIGenerate = async () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    try {
      const result = await generateSQLRecommendation(userInput);
      setRecommendation(result);
    } catch (error) {
      console.error('Failed to generate SQL recommendation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateFromAI = async () => {
    if (!recommendation) return;
    
    try {
      const data = await executeSQL(recommendation.sql);
      onCreateWidget({
        title: recommendation.title,
        type: recommendation.chartType,
        sql: recommendation.sql,
        data,
        dataKey: recommendation.dataKey,
        secondaryDataKey: recommendation.secondaryDataKey,
        xAxisKey: recommendation.xAxisKey,
      });
      onClose();
      setRecommendation(null);
      setUserInput('');
    } catch (error) {
      console.error('Failed to create widget:', error);
    }
  };

  const handleCreateManual = async () => {
    if (!manualConfig.sql.trim() || !manualConfig.title.trim()) return;
    
    try {
      const data = await executeSQL(manualConfig.sql);
      // Extract keys from first data item for configuration
      const firstItem = data[0] || {};
      const keys = Object.keys(firstItem);
      
      onCreateWidget({
        title: manualConfig.title,
        type: manualConfig.chartType,
        sql: manualConfig.sql,
        data,
        dataKey: keys[1] || 'value', // Assume second column is the value
        xAxisKey: keys[0] || 'name', // Assume first column is the label
      });
      onClose();
      setManualConfig({ title: '', chartType: 'line', sql: '' });
    } catch (error) {
      console.error('Failed to create widget:', error);
    }
  };

  const exampleQueries = [
    "Show me sales trends by month",
    "Revenue breakdown by region",
    "Product category performance",
    "Customer growth over time"
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create AI-Powered Widget</SheetTitle>
          <SheetDescription>
            Use AI to generate SQL queries and chart recommendations, or create your own custom queries.
          </SheetDescription>
        </SheetHeader>
        
        <div className="grid gap-6 py-6">
          {/* Mode Selection */}
          <div className="flex gap-2">
            <Button
              variant={mode === 'ai' ? 'default' : 'outline'}
              onClick={() => setMode('ai')}
              className="flex-1"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
            <Button
              variant={mode === 'manual' ? 'default' : 'outline'}
              onClick={() => setMode('manual')}
              className="flex-1"
            >
              <Database className="h-4 w-4 mr-2" />
              Manual SQL
            </Button>
          </div>

          {mode === 'ai' ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-input">What would you like to visualize?</Label>
                <Textarea
                  id="user-input"
                  placeholder="e.g., Show me monthly sales trends, or Revenue by product category..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Example queries:</Label>
                <div className="grid gap-2">
                  {exampleQueries.map((query, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="justify-start text-left h-auto p-2"
                      onClick={() => setUserInput(query)}
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAIGenerate}
                disabled={!userInput.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate SQL & Chart Recommendation'
                )}
              </Button>

              {recommendation && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Recommended Chart Type:</Label>
                      <p className="capitalize text-sm text-muted-foreground mt-1">
                        {recommendation.chartType} chart
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">AI Reasoning:</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {recommendation.reasoning}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Generated SQL:</Label>
                      <pre className="text-xs bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                        {recommendation.sql}
                      </pre>
                    </div>
                    
                    <Button onClick={handleCreateFromAI} className="w-full">
                      Create Widget
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="manual-title">Widget Title</Label>
                <Input
                  id="manual-title"
                  value={manualConfig.title}
                  onChange={(e) => setManualConfig({...manualConfig, title: e.target.value})}
                  placeholder="My Custom Chart"
                />
              </div>

              <div>
                <Label htmlFor="manual-chart-type">Chart Type</Label>
                <Select
                  value={manualConfig.chartType}
                  onValueChange={(value: 'line' | 'bar' | 'pie' | 'area') => 
                    setManualConfig({...manualConfig, chartType: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="manual-sql">SQL Query</Label>
                <Textarea
                  id="manual-sql"
                  value={manualConfig.sql}
                  onChange={(e) => setManualConfig({...manualConfig, sql: e.target.value})}
                  placeholder="SELECT month, revenue FROM sales GROUP BY month"
                  className="font-mono text-sm"
                  rows={6}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Available Tables & Columns</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  {mockSchema.tables.map((table) => (
                    <div key={table.name}>
                      <strong>{table.name}:</strong>
                      <ul className="ml-4 list-disc">
                        {table.columns.map((col) => (
                          <li key={col.name}>
                            {col.name} ({col.type}) {col.description && `- ${col.description}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button
                onClick={handleCreateManual}
                disabled={!manualConfig.sql.trim() || !manualConfig.title.trim()}
                className="w-full"
              >
                Create Widget
              </Button>
            </div>
          )}
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AIWidgetCreator;
