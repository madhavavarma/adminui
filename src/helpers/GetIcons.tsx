import DashboardIcon from '@mui/icons-material/Dashboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';

export const GetIcon = (iconName: string, color: string) => {
    switch(iconName.toUpperCase()) {
        case 'DASHBOARD':
            return <DashboardIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'VISIBILITY':
            return <VisibilityIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'EDIT':
            return <EditIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'DELETE':
            return <DeleteIcon sx= {{color: color ? `var(${color})` : ""}}/>
        default:
            return <ErrorIcon sx= {{color: color ? `var(${color})` : ""}} />
    }
}