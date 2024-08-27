import DashboardIcon from '@mui/icons-material/Dashboard';
import ErrorIcon from '@mui/icons-material/Error';

export const GetIcon = (iconName: string, color: string) => {
    switch(iconName.toUpperCase()) {
        case 'DASHBOARD':
            return <DashboardIcon sx= {{color: color ? `var(${color})` : ""}}/>
        default:
            return <ErrorIcon sx= {{color: color ? `var(${color})` : ""}} />
    }
}