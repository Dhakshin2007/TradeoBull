
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface StockChartProps {
  data: ChartDataPoint[];
  color?: string;
  showAxes?: boolean;
}

const StockChart: React.FC<StockChartProps> = ({ data, color = "#00d09c", showAxes = true }) => {
  
  // Custom tooltip to format currency
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 dark:bg-slate-800 text-white px-3 py-2 text-xs rounded-lg shadow-xl border border-gray-800 dark:border-slate-700">
          <p className="font-medium text-gray-400 mb-1">{label}</p>
          <p className="text-sm font-bold">₹{payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.15}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          {/* Grid color adapts to dark mode implicitly via opacity, but explicit color is better */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-100 dark:text-slate-800" />
          {showAxes && (
             <XAxis 
               dataKey="time" 
               hide={true} 
             />
          )}
          {showAxes && (
              <YAxis 
                domain={['auto', 'auto']} 
                orientation="right" 
                tick={{fontSize: 11, fill: '#9ca3af', fontWeight: 500}}
                tickFormatter={(value) => `${value.toFixed(0)}`}
                width={45}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
          )}
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            strokeWidth={2.5}
            activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
