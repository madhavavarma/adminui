import { Box } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', pageViews: 34, clicks: 24 },
  { name: 'Feb', pageViews: 65, clicks: 45 },
  { name: 'Mar', pageViews: 46, clicks: 35 },
  { name: 'Apr', pageViews: 68, clicks: 52 },
  { name: 'May', pageViews: 49, clicks: 38 },
  { name: 'Jun', pageViews: 61, clicks: 41 },
  { name: 'Jul', pageViews: 42, clicks: 32 },
  { name: 'Aug', pageViews: 44, clicks: 34 },
  { name: 'Sep', pageViews: 78, clicks: 58 },
  { name: 'Oct', pageViews: 52, clicks: 42 },
  { name: 'Nov', pageViews: 63, clicks: 48 },
  { name: 'Dec', pageViews: 67, clicks: 50 }
];

export const PerformanceChart = () => {
  return (
    <Box className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6c2f" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#ff6c2f" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="pageViews" 
            stroke="#ff6c2f" 
            fillOpacity={1} 
            fill="url(#colorPageViews)" 
          />
          <Area 
            type="monotone" 
            dataKey="clicks" 
            stroke="#22c55e" 
            fillOpacity={1} 
            fill="url(#colorClicks)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};