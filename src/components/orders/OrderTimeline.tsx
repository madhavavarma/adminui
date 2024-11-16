import { Box, Typography, Button } from '@mui/material';
import { CheckCircle, CircleDashed } from 'lucide-react';

interface TimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'processing';
  action?: {
    label: string;
    variant: 'contained' | 'outlined';
  };
}

const events: TimelineEvent[] = [
  {
    title: 'The packing has been started',
    description: 'Confirmed by Gaston Lapierre',
    timestamp: 'April 23, 2024, 09:40 am',
    status: 'processing'
  },
  {
    title: 'The Invoice has been sent to the customer',
    description: 'Invoice email was sent to hello@dundermuffilin.com',
    timestamp: 'April 23, 2024, 09:40 am',
    status: 'completed',
    action: {
      label: 'Resend Invoice',
      variant: 'outlined'
    }
  }
];

export const OrderTimeline = () => (
  <Box className="relative ml-6">
    <Box className="absolute left-0 top-0 h-full border-l-2 border-gray-200" />
    
    {events.map((event, index) => (
      <Box key={index} className="relative mb-8 ml-6">
        <Box className="absolute -left-9 bg-white p-1">
          {event.status === 'completed' ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <CircleDashed className="w-5 h-5 text-yellow-500 animate-spin" />
          )}
        </Box>
        
        <Box className="flex justify-between items-start">
          <Box>
            <Typography variant="subtitle1" className="font-medium text-gray-900">
              {event.title}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-1">
              {event.description}
            </Typography>
            {event.action && (
              <Button
                variant={event.action.variant}
                size="small"
                className="mt-2"
              >
                {event.action.label}
              </Button>
            )}
          </Box>
          <Typography variant="caption" className="text-gray-500">
            {event.timestamp}
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
);