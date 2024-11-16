import React from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  period: string;
  negative?: boolean;
}

export const StatsCard = ({ title, value, icon, change, period, negative }: StatsCardProps) => {
  return (
    <Paper className="overflow-hidden">
      <Box className="p-6">
        <Box className="grid grid-cols-2">
          <Box className="flex items-center">
            <Box className="w-12 h-12 bg-primary-50 rounded flex items-center justify-center">
              {icon}
            </Box>
          </Box>
          <Box className="text-right">
            <Typography variant="body2" color="textSecondary" className="truncate">
              {title}
            </Typography>
            <Typography variant="h5" className="mt-1">
              {value}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="p-2 bg-gray-50 bg-opacity-50 flex items-center justify-between">
        <Box className="flex items-center">
          {negative ? (
            <TrendingDown className="text-red-500 h-4 w-4" />
          ) : (
            <TrendingUp className="text-green-500 h-4 w-4" />
          )}
          <Typography 
            variant="body2" 
            className={`ml-1 ${negative ? 'text-red-500' : 'text-green-500'}`}
          >
            {change}
          </Typography>
          <Typography variant="caption" color="textSecondary" className="ml-2">
            {period}
          </Typography>
        </Box>
        <Button variant="text" size="small">
          View More
        </Button>
      </Box>
    </Paper>
  );
};