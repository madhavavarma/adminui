import { Box, Typography, CircularProgress } from '@mui/material';

interface ProgressStepProps {
  label: string;
  progress: number;
  isActive: boolean;
  isComplete: boolean;
}

const ProgressStep = ({ label, progress, isActive, isComplete }: ProgressStepProps) => (
  <Box className="flex-1">
    <Box className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
      <Box 
        className={`h-full transition-all duration-500 ${
          isComplete ? 'bg-green-500' : 
          isActive ? 'bg-yellow-500 animate-pulse' : 
          'bg-blue-500'
        }`}
        sx={{ width: `${progress}%` }}
      />
    </Box>
    <Box className="mt-2 flex items-center gap-2">
      <Typography variant="body2" className={isActive ? 'text-yellow-700' : 'text-gray-600'}>
        {label}
      </Typography>
      {isActive && <CircularProgress size={16} className="text-yellow-500" />}
    </Box>
  </Box>
);

export const OrderProgress = () => (
  <Box className="grid grid-cols-1 md:grid-cols-5 gap-4">
    <ProgressStep label="Order Confirming" progress={100} isComplete={true} isActive={false} />
    <ProgressStep label="Payment Pending" progress={100} isComplete={true} isActive={false} />
    <ProgressStep label="Processing" progress={60} isComplete={false} isActive={true} />
    <ProgressStep label="Shipping" progress={0} isComplete={false} isActive={false} />
    <ProgressStep label="Delivered" progress={0} isComplete={false} isActive={false} />
  </Box>
);