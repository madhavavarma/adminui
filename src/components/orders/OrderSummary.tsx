import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material';
import { ClipboardList, Ticket, Truck, Calculator } from 'lucide-react';

interface SummaryItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const summaryItems: SummaryItem[] = [
  { label: 'Sub Total', value: '$777.00', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Discount', value: '-$60.00', icon: <Ticket className="w-4 h-4" /> },
  { label: 'Delivery Charge', value: '$00.00', icon: <Truck className="w-4 h-4" /> },
  { label: 'Estimated Tax (15.5%)', value: '$20.00', icon: <Calculator className="w-4 h-4" /> },
];

export const OrderSummary = () => (
  <Card className="mb-4">
    <CardHeader title="Order Summary" />
    <CardContent>
      {summaryItems.map((item, index) => (
        <Box key={index} className="flex justify-between items-center mb-3 last:mb-0">
          <Box className="flex items-center gap-2">
            {item.icon}
            <Typography variant="body2">{item.label}</Typography>
          </Box>
          <Typography variant="body2" className="font-medium">
            {item.value}
          </Typography>
        </Box>
      ))}
    </CardContent>
    <Box className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t">
      <Typography variant="subtitle2">Total Amount</Typography>
      <Typography variant="subtitle1" className="font-medium">
        $737.00
      </Typography>
    </Box>
  </Card>
);