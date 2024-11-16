import { Card, CardHeader, CardContent, Box, Typography, IconButton } from '@mui/material';
import { Edit2 } from 'lucide-react';

export const CustomerDetails = () => (
  <Card>
    <CardHeader title="Customer Details" />
    <CardContent>
      <Box className="flex items-center gap-3 mb-6">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop"
          alt="Customer"
          className="w-12 h-12 rounded-lg border-2 border-white shadow"
        />
        <Box>
          <Typography variant="subtitle1">Gaston Lapierre</Typography>
          <Typography
            variant="body2"
            color="primary"
            component="a"
            href="mailto:hello@dundermuffilin.com"
          >
            hello@dundermuffilin.com
          </Typography>
        </Box>
      </Box>

      <Box className="mb-4">
        <Box className="flex justify-between items-center mb-2">
          <Typography variant="subtitle2">Contact Number</Typography>
          <IconButton size="small">
            <Edit2 className="w-4 h-4" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          (723) 732-760-5760
        </Typography>
      </Box>

      <Box className="mb-4">
        <Box className="flex justify-between items-center mb-2">
          <Typography variant="subtitle2">Shipping Address</Typography>
          <IconButton size="small">
            <Edit2 className="w-4 h-4" />
          </IconButton>
        </Box>
        <Box color="text.secondary">
          <Typography variant="body2">Wilson's Jewelers LTD</Typography>
          <Typography variant="body2">1344 Hershell Hollow Road</Typography>
          <Typography variant="body2">Tukwila, WA 98168</Typography>
          <Typography variant="body2">United States</Typography>
          <Typography variant="body2">(723) 732-760-5760</Typography>
        </Box>
      </Box>

      <Box>
        <Box className="flex justify-between items-center mb-2">
          <Typography variant="subtitle2">Billing Address</Typography>
          <IconButton size="small">
            <Edit2 className="w-4 h-4" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Same as shipping address
        </Typography>
      </Box>

      <Box className="mt-4">
        <iframe
          title="Customer Location"
          className="w-full h-[250px] rounded-lg border-0"
          src="https://maps.google.com/maps?width=100%&height=250&hl=en&q=Tukwila,WA&ie=UTF8&t=&z=14&iwloc=B&output=embed"
        />
      </Box>
    </CardContent>
  </Card>
);