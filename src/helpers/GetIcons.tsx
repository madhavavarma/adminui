import DashboardIcon from '@mui/icons-material/Dashboard';
import ErrorIcon from '@mui/icons-material/Error';

export const GetIcon = (iconName: string) => {
    switch(iconName.toUpperCase()) {
        case 'DASHBOARD':
            return <DashboardIcon />
        default:
            return <ErrorIcon />
    }
}