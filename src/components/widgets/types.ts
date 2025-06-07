
import { ChartConfig } from '@/utils/chartUtils';

export interface WidgetData {
  id: string;
  title: string;
  type: string;
  config?: ChartConfig;
  sql?: string;
  data?: any[];
}

export interface WidgetGridProps {
  onLayoutChange?: (layout: any) => void;
  onShowAICreator?: () => void;
}

export interface WidgetGridRef {
  handleAddWidget: (type: string) => void;
  handleShowAICreator: () => void;
}

export interface AIWidgetConfig {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  sql: string;
  data: any[];
  dataKey: string;
  secondaryDataKey?: string;
  xAxisKey: string;
}
