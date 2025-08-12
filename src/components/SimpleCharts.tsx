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
  Line,
  LineChart
} from 'recharts';

// Enhanced gradient definitions
const gradients = {
  primary: { id: 'primaryGradient', colors: ['hsl(var(--primary))', 'hsl(var(--primary-glow))'] },
  success: { id: 'successGradient', colors: ['#10b981', '#34d399'] },
  warning: { id: 'warningGradient', colors: ['#f59e0b', '#fbbf24'] },
  danger: { id: 'dangerGradient', colors: ['#ef4444', '#f87171'] },
  info: { id: 'infoGradient', colors: ['#3b82f6', '#60a5fa'] },
  purple: { id: 'purpleGradient', colors: ['#8b5cf6', '#a78bfa'] },
  pink: { id: 'pinkGradient', colors: ['#ec4899', '#f472b6'] }
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 backdrop-blur-sm">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Enhanced Bar Chart with gradients and animations
interface SimpleBarChartProps {
  data: any[];
  dataKeys: { key: string; color: string; name: string }[];
  height?: number;
  xAxisKey?: string;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  dataKeys, 
  height = 300, 
  xAxisKey = "department" 
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <defs>
        {Object.values(gradients).map(gradient => (
          <linearGradient key={gradient.id} id={gradient.id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradient.colors[0]} stopOpacity={0.9}/>
            <stop offset="100%" stopColor={gradient.colors[1]} stopOpacity={0.6}/>
          </linearGradient>
        ))}
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
      <XAxis 
        dataKey={xAxisKey} 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tick={{ fill: 'hsl(var(--muted-foreground))' }}
      />
      <YAxis 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tick={{ fill: 'hsl(var(--muted-foreground))' }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        wrapperStyle={{ color: 'hsl(var(--foreground))' }}
      />
      {dataKeys.map((key, index) => (
        <Bar 
          key={key.key} 
          dataKey={key.key} 
          fill={`url(#${Object.values(gradients)[index % Object.values(gradients).length].id})`}
          name={key.name}
          radius={[4, 4, 0, 0]}
          animationDuration={1000}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

// Enhanced Area Chart with beautiful gradients
interface SimpleAreaChartProps {
  data: any[];
  dataKeys: { key: string; color: string }[];
  height?: number;
  xAxisKey?: string;
}

export const SimpleAreaChart: React.FC<SimpleAreaChartProps> = ({ 
  data, 
  dataKeys, 
  height = 300, 
  xAxisKey = "month" 
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <defs>
        {dataKeys.map((key, index) => (
          <linearGradient key={`area-${key.key}`} id={`area-${key.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={key.color} stopOpacity={0.8}/>
            <stop offset="100%" stopColor={key.color} stopOpacity={0.1}/>
          </linearGradient>
        ))}
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
      <XAxis 
        dataKey={xAxisKey} 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tick={{ fill: 'hsl(var(--muted-foreground))' }}
      />
      <YAxis 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tick={{ fill: 'hsl(var(--muted-foreground))' }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
      {dataKeys.map((key, index) => (
        <Area 
          key={key.key} 
          type="monotone" 
          dataKey={key.key} 
          stackId="1" 
          stroke={key.color} 
          fill={`url(#area-${key.key})`}
          strokeWidth={2}
          animationDuration={1000}
        />
      ))}
    </AreaChart>
  </ResponsiveContainer>
);

// Enhanced Pie Chart with beautiful colors and animations
interface SimplePieChartProps {
  data: any[];
  height?: number;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <PieChart>
      <defs>
        {data.map((entry, index) => (
          <linearGradient key={`pie-${index}`} id={`pie-${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
            <stop offset="100%" stopColor={entry.color} stopOpacity={0.7}/>
          </linearGradient>
        ))}
      </defs>
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
      <Pie 
        data={data} 
        cx="50%" 
        cy="50%" 
        outerRadius={Math.min(height * 0.35, 100)}
        dataKey="value"
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
        labelLine={false}
        animationDuration={1000}
      >
        {data.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={`url(#pie-${index})`}
            stroke="hsl(var(--background))"
            strokeWidth={2}
          />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

// Enhanced Composed Chart
interface SimpleComposedChartProps {
  data: any[];
  height?: number;
  xAxisKey?: string;
}

export const SimpleComposedChart: React.FC<SimpleComposedChartProps> = ({ 
  data, 
  height = 300, 
  xAxisKey = "day" 
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9}/>
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
      <XAxis 
        dataKey={xAxisKey} 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tick={{ fill: 'hsl(var(--muted-foreground))' }}
      />
      <YAxis 
        yAxisId="left" 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tick={{ fill: 'hsl(var(--muted-foreground))' }}
      />
      <YAxis 
        yAxisId="right" 
        orientation="right" 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tick={{ fill: 'hsl(var(--muted-foreground))' }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
      <Bar 
        yAxisId="left" 
        dataKey="avgHours" 
        fill="url(#barGradient)" 
        name="Avg Hours" 
        radius={[4, 4, 0, 0]}
        animationDuration={1000}
      />
      <Line 
        yAxisId="right" 
        type="monotone" 
        dataKey="productivity" 
        stroke="#10b981" 
        strokeWidth={3}
        name="Productivity %" 
        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
        activeDot={{ r: 6, fill: '#10b981' }}
        animationDuration={1000}
      />
    </ComposedChart>
  </ResponsiveContainer>
);

// New Line Chart component
interface SimpleLineChartProps {
  data: any[];
  dataKeys: { key: string; color: string; name: string }[];
  height?: number;
  xAxisKey?: string;
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ 
  data, 
  dataKeys, 
  height = 300, 
  xAxisKey = "month" 
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
      <XAxis 
        dataKey={xAxisKey} 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tick={{ fill: 'hsl(var(--muted-foreground))' }}
      />
      <YAxis 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tick={{ fill: 'hsl(var(--muted-foreground))' }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
      {dataKeys.map((key) => (
        <Line 
          key={key.key}
          type="monotone" 
          dataKey={key.key} 
          stroke={key.color}
          strokeWidth={3}
          name={key.name}
          dot={{ fill: key.color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: key.color }}
          animationDuration={1000}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

// Mock data generators for testing
export const generateMockData = {
  attendanceTrend: [
    { month: 'Jan', present: 85, wfh: 12, absent: 3 },
    { month: 'Feb', present: 88, wfh: 10, absent: 2 },
    { month: 'Mar', present: 82, wfh: 15, absent: 3 },
    { month: 'Apr', present: 90, wfh: 8, absent: 2 },
    { month: 'May', present: 87, wfh: 11, absent: 2 },
    { month: 'Jun', present: 89, wfh: 9, absent: 2 }
  ],
  
  taskStatus: [
    { name: 'Completed', value: 45, color: '#10b981' },
    { name: 'In Progress', value: 32, color: '#3b82f6' },
    { name: 'Pending', value: 18, color: '#f59e0b' },
    { name: 'Blocked', value: 5, color: '#ef4444' }
  ],
  
  departmentPerformance: [
    { department: 'Engineering', completed: 45, pending: 12, blocked: 3 },
    { department: 'Design', completed: 32, pending: 8, blocked: 2 },
    { department: 'Marketing', completed: 28, pending: 15, blocked: 1 },
    { department: 'Sales', completed: 38, pending: 10, blocked: 2 },
    { department: 'HR', completed: 22, pending: 6, blocked: 1 }
  ],
  
  weeklyProductivity: [
    { day: 'Mon', avgHours: 7.5, productivity: 85 },
    { day: 'Tue', avgHours: 8.2, productivity: 92 },
    { day: 'Wed', avgHours: 7.8, productivity: 88 },
    { day: 'Thu', avgHours: 8.0, productivity: 90 },
    { day: 'Fri', avgHours: 7.3, productivity: 78 },
    { day: 'Sat', avgHours: 4.5, productivity: 65 },
    { day: 'Sun', avgHours: 2.1, productivity: 45 }
  ],
  
  sprintVelocity: [
    { sprint: 'Sprint 1', planned: 45, completed: 42, remaining: 320 },
    { sprint: 'Sprint 2', planned: 50, completed: 48, remaining: 272 },
    { sprint: 'Sprint 3', planned: 48, completed: 45, remaining: 227 },
    { sprint: 'Sprint 4', planned: 52, completed: 55, remaining: 172 },
    { sprint: 'Sprint 5', planned: 46, completed: 46, remaining: 126 }
  ]
};