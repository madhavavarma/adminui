import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material';
import { CheckCircle } from 'lucide-react';

export const PaymentInfo = () => (
  <Card className="mb-4">
    <CardHeader title="Payment Information" />
    <CardContent>
      <Box className="flex items-center gap-3 mb-4">
        <Box className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
            alt="Mastercard"
            className="w-8 h-8 object-contain"
          />
        </Box>
        <Box className="flex-grow">
          <Typography variant="subtitle2">Master Card</Typography>
          <Typography variant="body2" color="text.secondary">
            xxxx xxxx xxxx 7812
          </Typography>
        </Box>
        <CheckCircle className="w-5 h-5 text-green-500" />
      </Box>

      <Typography variant="subtitle2" className="mb-1">
        Transaction ID: <span className="font-normal text-gray-600 text-sm">IDN768139059</span>
      </Typography>
      <Typography variant="subtitle2">
        Card Holder Name: <span className="font-normal text-gray-600 text-sm">Gaston Lapierre</span>
      </Typography>
    </CardContent>
  </Card>
);