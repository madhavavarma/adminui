import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Box, 
  Typography
} from '@mui/material';
import { IProduct } from '../../models/IProduct';


const products: IProduct[] = [
  {
    id: 1,
    name: 'Men Black Slim Fit T-shirt',
    price: 80.00,
    tax: 3.00,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop',

    description: "",
    discount: 0,
    isPublished: true,
    productCategories: [],
    productVariants: [],
    productTags: []
  },
  // Add more products as needed
];

export const ProductTable = () => (
  <Table>
    <TableHead className="bg-gray-50">
      <TableRow>
        <TableCell>Product Name & Size</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Tax</TableCell>
        <TableCell>Amount</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell>
            <Box className="flex items-center gap-4">
              <Box className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded" />
              </Box>
              <Box>
                <Typography variant="subtitle2" className="text-gray-900">
                  {product.name}
                </Typography>
                {/* <Typography variant="caption" className="text-gray-500">
                  Size: {product.size}
                </Typography> */}
              </Box>
            </Box>
          </TableCell>
          {/* <TableCell>
            <Chip 
              label={product.status}
              size="small"
              className={product.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
            />
          </TableCell>
          <TableCell>{product.quantity}</TableCell> */}
          <TableCell>${product.price.toFixed(2)}</TableCell>
          <TableCell>${product.tax.toFixed(2)}</TableCell>
          <TableCell>${product.price.toFixed(2)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);