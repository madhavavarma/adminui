import { Paper, Box, Typography, Button, Avatar } from '@mui/material';
import { Plus } from 'lucide-react';

const orders = [
  {
    id: '#RB5625',
    date: '29 April 2024',
    product: '/products/product-1.png',
    customer: 'Anna M. Hines',
    email: 'anna.hines@mail.com',
    phone: '(+1)-555-1564-261',
    address: 'Burr Ridge/Illinois',
    payment: 'Credit Card',
    status: 'Completed'
  },
  // Add more orders as needed
];

export const RecentOrders = () => {
  return (
    <Paper>
      <Box className="p-6 flex items-center justify-between">
        <Typography variant="h6">Recent Orders</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Plus className="h-4 w-4" />}
        >
          Create Order
        </Button>
      </Box>
      <Box className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                'Order ID', 'Date', 'Product', 'Customer Name', 'Email ID',
                'Phone No.', 'Address', 'Payment Type', 'Status'
              ].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography variant="body2" className="text-primary-600">
                    {order.id}
                  </Typography>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography variant="body2">{order.date}</Typography>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Avatar src={order.product} variant="rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography variant="body2" className="text-primary-600">
                    {order.customer}
                  </Typography>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography variant="body2">{order.email}</Typography>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography variant="body2">{order.phone}</Typography>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography variant="body2">{order.address}</Typography>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography variant="body2">{order.payment}</Typography>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography 
                    variant="body2" 
                    className={`inline-flex items-center ${
                      order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      order.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-600'
                    }`} />
                    {order.status}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <Box className="p-4 border-t flex items-center justify-between">
        <Typography variant="body2" color="textSecondary">
          Showing <span className="font-semibold">5</span> of{' '}
          <span className="font-semibold">90,521</span> orders
        </Typography>
        <Box className="flex items-center space-x-2">
          {['1', '2', '3'].map((page) => (
            <Button
              key={page}
              variant={page === '1' ? 'contained' : 'outlined'}
              size="small"
              className="min-w-[32px]"
            >
              {page}
            </Button>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};