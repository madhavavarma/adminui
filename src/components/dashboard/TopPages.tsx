import { Paper, Box, Typography, Button } from '@mui/material';

const pages = [
  { path: 'larkon/ecommerce.html', views: 465, exitRate: 4.4 },
  { path: 'larkon/dashboard.html', views: 426, exitRate: 20.4 },
  { path: 'larkon/chat.html', views: 254, exitRate: 12.25 },
  { path: 'larkon/auth-login.html', views: 3369, exitRate: 5.2 },
  { path: 'larkon/email.html', views: 985, exitRate: 64.2 },
  { path: 'larkon/social.html', views: 653, exitRate: 2.4 },
  { path: 'larkon/blog.html', views: 478, exitRate: 1.4 }
];

export const TopPages = () => {
  return (
    <Paper>
      <Box className="p-6 flex items-center justify-between">
        <Typography variant="h6">Top Pages</Typography>
        <Button variant="contained" color="primary" size="small">
          View All
        </Button>
      </Box>
      <Box className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page Path
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exit Rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography variant="body2" className="text-gray-900">
                    {page.path}
                  </Typography>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography variant="body2">{page.views}</Typography>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Typography 
                    variant="body2" 
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      page.exitRate < 10 ? 'bg-green-100 text-green-800' : 
                      page.exitRate < 30 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {page.exitRate}%
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
};