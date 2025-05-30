import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface AreaChartProps {
  data: DataPoint[];
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showAxis?: boolean;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
}

const defaultCurrencyFormatter = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function AreaChart({
  data,
  dataKey,
  xAxisKey = 'name',
  color = '#0c89e9',
  height = 300,
  showGrid = true,
  showTooltip = true,
  showAxis = true,
  yAxisFormatter = defaultCurrencyFormatter,
  tooltipFormatter = defaultCurrencyFormatter,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 36,
          bottom: 10,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        {showAxis && <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} />}
        {showAxis && <YAxis tick={{ fontSize: 12 }} tickFormatter={yAxisFormatter} />} 
        {showTooltip && <Tooltip formatter={tooltipFormatter} />}
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          fill={`${color}20`}
          fillOpacity={0.3}
          activeDot={{ r: 6 }}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}