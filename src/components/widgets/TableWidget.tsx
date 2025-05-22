
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Widget } from './Widget';
import { productsData } from '@/data/sampleData';
import { formatCurrency } from '@/utils/chartUtils';

interface Column {
  key: string;
  header: string;
  format?: (value: any) => string;
}

interface TableWidgetProps {
  id: string;
  title: string;
  onRemove: (id: string) => void;
  onConfigure: (id: string) => void;
}

export const TableWidget: React.FC<TableWidgetProps> = ({
  id,
  title,
  onRemove,
  onConfigure
}) => {
  const columns: Column[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Product Name' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price', format: (value) => formatCurrency(value) },
    { key: 'stock', header: 'Stock' },
    { key: 'rating', header: 'Rating', format: (value) => `${value}/5` },
  ];

  return (
    <Widget
      id={id}
      title={title}
      type="table"
      onRemove={onRemove}
      onConfigure={onConfigure}
    >
      <div className="overflow-auto max-h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className="font-semibold">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.map((product) => (
              <TableRow key={product.id}>
                {columns.map((column) => (
                  <TableCell key={`${product.id}-${column.key}`}>
                    {column.format ? column.format(product[column.key as keyof typeof product]) : product[column.key as keyof typeof product]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Widget>
  );
};

export default TableWidget;
