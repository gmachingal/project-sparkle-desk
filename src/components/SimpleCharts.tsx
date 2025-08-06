import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Cell, 
  AreaChart, 
  Area, 
  Pie, 
  ComposedChart,
  Line
} from 'recharts';

interface SimpleBarChartProps {
  data: any[];
  dataKeys: { key: string; color: string; name: string }[];
  height?: number;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, dataKeys, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="department" />
      <YAxis />
      <Tooltip />
      <Legend />
      {dataKeys.map((key) => (
        <Bar key={key.key} dataKey={key.key} fill={key.color} name={key.name} />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

interface SimpleAreaChartProps {
  data: any[];
  dataKeys: { key: string; color: string }[];
  height?: number;
}

export const SimpleAreaChart: React.FC<SimpleAreaChartProps> = ({ data, dataKeys, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      {dataKeys.map((key, index) => (
        <Area 
          key={key.key} 
          type="monotone" 
          dataKey={key.key} 
          stackId="1" 
          stroke={key.color} 
          fill={key.color} 
          fillOpacity={0.8} 
        />
      ))}
    </AreaChart>
  </ResponsiveContainer>
);

interface SimplePieChartProps {
  data: any[];
  height?: number;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <PieChart>
      <Tooltip />
      <Legend />
      <Pie 
        data={data} 
        cx="50%" 
        cy="50%" 
        outerRadius={80}
        dataKey="value"
        label={({ name, value }) => `${name}: ${value}`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

interface SimpleComposedChartProps {
  data: any[];
  height?: number;
}

export const SimpleComposedChart: React.FC<SimpleComposedChartProps> = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <ComposedChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="avgHours" fill="#8884d8" name="Avg Hours" />
      <Line yAxisId="right" type="monotone" dataKey="productivity" stroke="#ff7300" strokeWidth={2} name="Productivity %" />
    </ComposedChart>
  </ResponsiveContainer>
);