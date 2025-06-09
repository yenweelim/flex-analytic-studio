
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Settings } from 'lucide-react';

interface WidgetConfigurationPanelProps {
  widgetId: string;
  widgetType: string;
  widgetTitle: string;
  autoGenerateAI?: boolean;
  onUpdateAutoGenerate?: (value: boolean) => void;
  onUpdateWidget?: (id: string, config: any) => void;
  onClose: () => void;
}

export const WidgetConfigurationPanel: React.FC<WidgetConfigurationPanelProps> = ({
  widgetId,
  widgetType,
  widgetTitle,
  autoGenerateAI = true,
  onUpdateAutoGenerate,
  onUpdateWidget,
  onClose
}) => {
  const [mode, setMode] = useState<'ai' | 'sql'>('ai');
  const [userInput, setUserInput] = useState('Show monthly sales trends with revenue breakdown by product category for Q4 2024. Include year-over-year comparison and highlight top performing categories with drill-down capabilities.');
  const [sqlInput, setSqlInput] = useState(`SELECT 
  DATE_FORMAT(s.sale_date, '%Y-%m') as month,
  pc.category_name,
  SUM(s.revenue) as monthly_revenue,
  COUNT(s.sale_id) as transaction_count,
  AVG(s.revenue) as avg_transaction_value,
  RANK() OVER (PARTITION BY DATE_FORMAT(s.sale_date, '%Y-%m') ORDER BY SUM(s.revenue) DESC) as category_rank
FROM sales s
JOIN products p ON s.product_id = p.product_id
JOIN product_categories pc ON p.category_id = pc.category_id
WHERE s.sale_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
  AND s.sale_date < CURDATE()
GROUP BY DATE_FORMAT(s.sale_date, '%Y-%m'), pc.category_name
HAVING SUM(s.revenue) > 1000
ORDER BY month DESC, monthly_revenue DESC
LIMIT 100;`);

  return (
    <div className="h-full flex flex-col">
      {/* Mode selection */}
      <div className="flex gap-2 mb-4 flex-shrink-0">
        <Button
          variant={mode === 'ai' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('ai')}
          className="flex-1"
          style={{
            backgroundColor: mode === 'ai' ? 'var(--purple-primary)' : 'transparent',
            borderColor: 'var(--outline-1)',
            color: mode === 'ai' ? 'var(--font-alternate)' : 'var(--font-primary)'
          }}
        >
          <Bot className="h-3 w-3 mr-1" />
          AI
        </Button>
        <Button
          variant={mode === 'sql' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('sql')}
          className="flex-1"
          style={{
            backgroundColor: mode === 'sql' ? 'var(--purple-primary)' : 'transparent',
            borderColor: 'var(--outline-1)',
            color: mode === 'sql' ? 'var(--font-alternate)' : 'var(--font-primary)'
          }}
        >
          <Settings className="h-3 w-3 mr-1" />
          SQL
        </Button>
      </div>

      {mode === 'ai' ? (
        <div className="flex-1 flex flex-col min-h-0">
          <label 
            className="text-sm font-medium mb-2 block flex-shrink-0"
            style={{
              color: 'var(--font-primary)',
              fontFamily: 'var(--font-h2)',
              fontWeight: 'var(--font-h2-weight)',
              fontSize: 'var(--font-h2-size)'
            }}
          >
            Describe what you want to visualize:
          </label>
          <div className="flex-1 min-h-0 mb-3">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g., Show monthly sales trends..."
              className="w-full h-full text-xs border rounded p-2 resize-none"
              style={{
                borderColor: 'var(--outline-1)',
                backgroundColor: 'var(--background-1)',
                color: 'var(--font-primary)',
                fontFamily: 'var(--font-body-1)',
                fontSize: 'var(--font-body-1-size)',
                minHeight: '80px'
              }}
            />
          </div>
          <Button 
            size="sm" 
            className="w-full flex-shrink-0"
            style={{
              backgroundColor: 'var(--purple-primary)',
              color: 'var(--font-alternate)'
            }}
          >
            Generate Chart
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <label 
            className="text-sm font-medium mb-2 block flex-shrink-0"
            style={{
              color: 'var(--font-primary)',
              fontFamily: 'var(--font-h2)',
              fontWeight: 'var(--font-h2-weight)',
              fontSize: 'var(--font-h2-size)'
            }}
          >
            SQL Query:
          </label>
          <div className="flex-1 min-h-0 mb-3">
            <textarea
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
              placeholder="SELECT month, revenue FROM sales..."
              className="w-full h-full text-xs font-mono border rounded p-2 resize-none"
              style={{
                borderColor: 'var(--outline-1)',
                backgroundColor: 'var(--background-1)',
                color: 'var(--font-primary)',
                fontFamily: 'var(--font-body-1)',
                fontSize: 'var(--font-body-1-size)',
                minHeight: '80px'
              }}
            />
          </div>
          <Button 
            size="sm" 
            className="w-full flex-shrink-0"
            style={{
              backgroundColor: 'var(--purple-primary)',
              color: 'var(--font-alternate)'
            }}
          >
            Execute Query
          </Button>
        </div>
      )}

      {/* Auto-generate AI description setting */}
      <div className="pt-3 mt-3 border-t flex-shrink-0" style={{ borderColor: 'var(--outline-1)' }}>
        <div className="flex items-center justify-between mb-2">
          <label 
            className="text-sm font-medium"
            style={{
              color: 'var(--font-primary)',
              fontFamily: 'var(--font-h2)',
              fontWeight: 'var(--font-h2-weight)',
              fontSize: 'var(--font-h2-size)'
            }}
          >
            Auto-generate AI insights
          </label>
          <Button
            variant={autoGenerateAI ? "default" : "outline"}
            size="sm"
            onClick={() => onUpdateAutoGenerate?.(!autoGenerateAI)}
            className="h-6 text-xs"
            style={{
              backgroundColor: autoGenerateAI ? 'var(--semantic-confirm)' : 'transparent',
              borderColor: 'var(--outline-1)',
              color: autoGenerateAI ? 'var(--font-alternate)' : 'var(--font-primary)'
            }}
          >
            {autoGenerateAI ? "ON" : "OFF"}
          </Button>
        </div>
        <p 
          className="text-xs mb-3"
          style={{ 
            color: 'var(--font-secondary)',
            fontFamily: 'var(--font-body-1)',
            fontSize: 'var(--font-body-2-size)'
          }}
        >
          Automatically generate AI descriptions when data refreshes
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClose}
          className="w-full"
          style={{
            borderColor: 'var(--outline-1)',
            backgroundColor: 'transparent',
            color: 'var(--font-primary)'
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
